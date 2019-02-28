import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { FireRequestCommand } from './fire-request.command';
import { ForbiddenException, HttpService } from '@nestjs/common';
import { switchMap, catchError, map } from 'rxjs/operators';
import { from, throwError } from 'rxjs';
import { QueueLogService } from '../../../track-and-trace/entities/queue-log/queue-log.service';
import { RegisteredClientService } from '../../../auth/entities/registered-client/registered-client.service';
import { ConfigService } from '../../../config/config.service';

@CommandHandler(FireRequestCommand)
export class FireRequestHandler implements ICommandHandler<FireRequestCommand> {
  constructor(
    private readonly queueLog: QueueLogService,
    private readonly registeredClientService: RegisteredClientService,
    private readonly publisher: EventPublisher,
    private readonly http: HttpService,
    private readonly config: ConfigService,
  ) {}

  async execute(commandData: FireRequestCommand, resolve: (value?) => void) {
    const { clientId, body, endpoint } = commandData;
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
        switchMap(foundClient => {
          if (!foundClient) {
            return throwError(
              new ForbiddenException('Client Access Forbidden'),
            );
          }
          const VENDOR_KEY = this.config.get('VENDOR_KEY');
          return this.http.post(endpoint, [body], {
            auth: {
              username: VENDOR_KEY,
              password: foundClient.userKey,
            },
            params: { licenseNumber: foundClient.licenseNumber },
          });
        }),
        switchMap(response => {
          return this.saveResponseToLog(queueId, response.data, queueAggregate);
        }),
        catchError(error => {
          return this.saveErrorToLog(queueId, error, queueAggregate);
        }),
      )
      .subscribe({
        next: success => {},
        error: error => {},
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
