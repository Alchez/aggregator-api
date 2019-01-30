import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { FireRequestCommand } from './fire-request.command';
import { QueueLogService } from '../../models/queue-log/queue-log.service';
import { ForbiddenException } from '@nestjs/common';
import { retry, switchMap, catchError, map } from 'rxjs/operators';
import { from, throwError } from 'rxjs';
import { RegisteredClientService } from '../../models/registered-client/registered-client.service';

@CommandHandler(FireRequestCommand)
export class FireRequestHandler implements ICommandHandler<FireRequestCommand> {
  constructor(
    private readonly queueLog: QueueLogService,
    private readonly registeredClientService: RegisteredClientService,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(commandData: FireRequestCommand, resolve: (value?) => void) {
    const { clientId, body, request } = commandData;
    const queueData = new (this.queueLog.getModel())();
    queueData.clientId = clientId;
    queueData.data = body;
    const queueId = queueData.uuid;

    const queueAggregate = this.publisher.mergeObjectContext(this.queueLog);

    resolve({ queueId }); // Resolve Command First with queueId

    // Process Async
    await this.queueLog.saveRequest(queueData);

    from(this.registeredClientService.findOne({ clientId }))
      .pipe(
        retry(3),
        switchMap(foundClient => {
          if (!foundClient) {
            return throwError(
              new ForbiddenException('Client Access Forbidden'),
            );
          }
          return request;
        }),
        switchMap(response => {
          return this.saveResponseToLog(queueId, response.data, queueAggregate);
        }),
        catchError(error =>
          this.saveErrorToLog(queueId, error, queueAggregate),
        ),
      )
      .subscribe({
        next: async resolvedQueue => {
          // Callback for success
        },
        error: error => {
          // Callback for error
        },
      });
  }

  saveResponseToLog(uuid, response, queueAggregate) {
    return from(this.queueLog.findOne({ uuid })).pipe(
      switchMap(savedLog => {
        savedLog.response = response;
        return from(this.queueLog.saveResponse(savedLog));
      }),
      map(responseLog => {
        queueAggregate.commit();
        return responseLog;
      }),
    );
  }

  saveErrorToLog(uuid, error, queueAggregate) {
    return from(this.queueLog.findOne({ uuid })).pipe(
      switchMap(savedLog => {
        savedLog.error = error;
        return from(this.queueLog.saveError(savedLog));
      }),
      map(errorLog => {
        queueAggregate.commit();
        return errorLog;
      }),
    );
  }
}
