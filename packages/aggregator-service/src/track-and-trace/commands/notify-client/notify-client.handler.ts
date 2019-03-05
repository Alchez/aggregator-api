import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { HttpService } from '@nestjs/common';
import { from } from 'rxjs';
import { retry, switchMap, catchError } from 'rxjs/operators';
import { NotifyClientCommand } from './notify-client.command';
import { QueueLogService } from '../../../track-and-trace/entities/queue-log/queue-log.service';
import { RegisteredClientService } from '../../../auth/entities/registered-client/registered-client.service';

@CommandHandler(NotifyClientCommand)
export class NotifyClientHandler
  implements ICommandHandler<NotifyClientCommand> {
  constructor(
    private readonly queueLog: QueueLogService,
    private readonly registeredClientService: RegisteredClientService,
    private readonly http: HttpService,
  ) {}

  async execute(commandData: NotifyClientCommand, resolve: (value?) => void) {
    const { clientId, queueId } = commandData;

    const client = await this.registeredClientService.findOne({ clientId });
    const queue = await this.queueLog.findOne({ uuid: queueId });
    this.http
      .post(client.webhookURL, { queueId, queue })
      .pipe(
        retry(3),
        switchMap(response => {
          return this.saveWebhookResponseToLog(queueId, response.data);
        }),
        catchError(error => {
          return this.saveWebhookErrorToLog(queueId, error);
        }),
      )
      .subscribe({
        next: success => {},
        error: error => {},
      });
    resolve();
  }

  saveWebhookResponseToLog(uuid, response) {
    return from(this.queueLog.findOne({ uuid })).pipe(
      switchMap(savedLog => {
        savedLog.webhookResponse = response;
        return from(this.queueLog.saveWebhookResponse(savedLog));
      }),
    );
  }

  saveWebhookErrorToLog(uuid, error) {
    return from(this.queueLog.findOne({ uuid })).pipe(
      switchMap(savedLog => {
        savedLog.webhookResponse = error.toString();
        return from(this.queueLog.saveWebhookResponse(savedLog));
      }),
    );
  }
}
