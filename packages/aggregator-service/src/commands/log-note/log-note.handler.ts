import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { LogNoteCommand } from './log-note.command';
import { QueueLogService } from '../../models/queue-log/queue-log.service';
import { HttpService, ForbiddenException } from '@nestjs/common';
import { retry, switchMap, catchError } from 'rxjs/operators';
import { from, throwError } from 'rxjs';
import { RegisteredClientService } from '../../models/registered-client/registered-client.service';

@CommandHandler(LogNoteCommand)
export class LogNoteHandler implements ICommandHandler<LogNoteCommand> {
  constructor(
    private readonly queueLog: QueueLogService,
    private readonly http: HttpService,
    private readonly registeredClientService: RegisteredClientService,
  ) {}

  async execute(commandData: LogNoteCommand, resolve: (value?) => void) {
    const { clientId, body } = commandData;
    const queueData = new (this.queueLog.getModel())();
    queueData.clientId = clientId;
    queueData.data = body;
    const queueId = queueData.uuid;
    resolve({ queueId }); // Resolve Command First with queueId

    // Process Async
    await this.queueLog.save(queueData);

    const registeredClient = await this.registeredClientService.findOne({
      clientId,
    });

    from(this.registeredClientService.findOne({ clientId }))
      .pipe(
        retry(3),
        switchMap(foundClient => {
          if (!foundClient) {
            return throwError(
              new ForbiddenException('Client Access Forbidden'),
            );
          }
          return this.http.get('http://localhost:7100/info'); // Use third party api VERB here
        }),
        switchMap(response => {
          return this.saveResponseToLog(queueId, response.data);
        }),
        switchMap(resolvedQueue => {
          if (!registeredClient) {
            return throwError(new ForbiddenException());
          }
          // Fire webhook with data {resolvedQueue}
          // get webhook url from client
          // Fire POST Request not get request
          return this.http.get(registeredClient.webhookURL);
        }),
        switchMap(webhookResponse => {
          return this.saveWebhookResponseToLog(queueId, webhookResponse.data);
        }),
        catchError(err => {
          return this.saveErrorToLog(queueId, err);
        }),
      )
      .subscribe({
        next: async resolvedQueue => {
          // Subscribe for success
          // console.log('resolved queue . . .');
        },
        error: error => {
          // Subscribe for error or results in fatal error
          // console.error('error . . .');
        },
      });
  }

  saveResponseToLog(uuid, response) {
    return from(this.queueLog.findOne({ uuid })).pipe(
      switchMap(savedLog => {
        savedLog.response = response;
        return from(this.queueLog.save(savedLog));
      }),
    );
  }

  saveErrorToLog(uuid, error) {
    return from(this.queueLog.findOne({ uuid })).pipe(
      switchMap(savedLog => {
        savedLog.error = error;
        return from(this.queueLog.save(savedLog));
      }),
    );
  }

  saveWebhookResponseToLog(uuid, response) {
    return from(this.queueLog.findOne({ uuid })).pipe(
      switchMap(savedLog => {
        savedLog.webhookResponse = response;
        return from(this.queueLog.save(savedLog));
      }),
    );
  }
}
