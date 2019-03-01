import { ForbiddenException, HttpService } from '@nestjs/common';
import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { from, throwError } from 'rxjs';
import { catchError, switchMap, map } from 'rxjs/operators';
import { RegisteredClientService } from '../../../auth/entities/registered-client/registered-client.service';
import { ConfigService } from '../../../config/config.service';
import { FireGetRequestCommand } from './fire-get-request.command';
import { QueueLogService } from '../../../track-and-trace/entities/queue-log/queue-log.service';

@CommandHandler(FireGetRequestCommand)
export class FireGetRequestHandler
  implements ICommandHandler<FireGetRequestCommand> {
  constructor(
    private readonly registeredClientService: RegisteredClientService,
    private readonly http: HttpService,
    private readonly config: ConfigService,
    private readonly queueLog: QueueLogService,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(commandData: FireGetRequestCommand, resolve: (value?) => void) {
    const { clientId, endpoint } = commandData;

    const queueData = new (this.queueLog.getModel())();
    queueData.clientId = clientId;
    queueData.data = endpoint;
    const queueId = queueData.uuid;

    const queueAggregate = this.publisher.mergeObjectContext(this.queueLog);

    resolve({ queueId }); // Resolve Command First with queueId

    // Process Async
    await this.queueLog.saveRequest(queueData);

    const VENDOR_KEY = this.config.get('VENDOR_KEY');
    from(this.registeredClientService.findOne({ clientId }))
      .pipe(
        switchMap(foundClient => {
          if (!foundClient) {
            // Guard allows all clients. Forbidden for unregistered clients.
            return throwError(
              new ForbiddenException('Client Access Forbidden'),
            );
          }
          return this.http.get(endpoint, {
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
