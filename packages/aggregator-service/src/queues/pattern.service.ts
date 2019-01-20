import { Injectable, HttpService } from '@nestjs/common';
import { MessageData } from './message-data.interface';
import { QueueLogService } from '../models/queue-log/queue-log.service';
import { retry, switchMap, catchError, delay } from 'rxjs/operators';
import { from } from 'rxjs';

@Injectable()
export class MicroservicePatternService {
  constructor(
    private readonly http: HttpService,
    private readonly queueLog: QueueLogService,
  ) {}

  async processMessage(data: MessageData) {
    const { message, clientId } = data;

    const queueData = new (this.queueLog.getModel())();
    queueData.clientId = clientId;
    queueData.data = message;
    const queueId = queueData.uuid;
    await this.queueLog.save(queueData),
      this.http
        .get('http://localhost:9100/info')
        .pipe(
          delay(7500),
          retry(3),
          switchMap(response => {
            return this.saveResponseToLog(queueId, response.data);
          }),
          catchError(err => {
            return this.saveErrorToLog(queueId, err.error);
          }),
          switchMap(resolvedQueue => {
            // Fire webhook with data
            return this.http.get('http://localhost:9100/info/service').pipe(
              delay(7500),
              switchMap(webhookResponse => {
                return this.saveWebhookResponseToLog(
                  queueId,
                  webhookResponse.data,
                );
              }),
              catchError(webhookError => {
                return this.saveWebhookResponseToLog(
                  queueId,
                  webhookError.error,
                );
              }),
            );
          }),
        )
        .subscribe({
          next: resolvedQueue => {
            // Subscribe for results
          },
          error: err => {
            // Subscribe to handle fatal errors
          },
        });
    return { message, clientId };
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
