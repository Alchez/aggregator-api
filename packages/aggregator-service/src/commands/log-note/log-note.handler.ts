import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { LogNoteCommand } from './log-note.command';
import { QueueLogService } from '../../models/queue-log/queue-log.service';
import { QueueLog } from '../../models/queue-log/queue-log.collection';
import { HttpService } from '@nestjs/common';
import { retry, switchMap, catchError, delay } from 'rxjs/operators';
import { from } from 'rxjs';

@CommandHandler(LogNoteCommand)
export class LogNoteHandler implements ICommandHandler<LogNoteCommand> {
  constructor(
    private readonly queueLog: QueueLogService,
    private readonly http: HttpService,
  ) {}

  async execute(commandData: LogNoteCommand, resolve: (value?) => void) {
    const { clientId, body } = commandData;
    const queueData = new QueueLog();
    queueData.clientId = clientId;
    queueData.data = body;
    const queueId = queueData.uuid;
    resolve({ queueId });
    await this.queueLog.save(queueData),
      this.http
        .get('http://localhost:9000/info')
        .pipe(
          delay(7500),
          retry(3),
          switchMap(response => {
            return this.saveResponseToLog(queueId, response.data);
          }),
          switchMap(resolvedQueue => {
            // Fire webhook with data
            return this.http.get('http://localhost:9000/info/service').pipe(
              delay(7500),
              switchMap(webhookResponse => {
                return this.saveWebhookResponseToLog(
                  queueId,
                  webhookResponse.data,
                );
              }),
            );
          }),
        )
        .pipe(
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
