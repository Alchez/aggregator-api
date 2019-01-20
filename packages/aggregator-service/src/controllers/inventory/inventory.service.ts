import { Injectable, HttpService } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { LogNoteCommand } from '../../commands/log-note/log-note.command';
import { retry } from 'rxjs/operators';
import { QueueLogService } from '../../models/queue-log/queue-log.service';

@Injectable()
export class InventoryService {
  // @Client({
  //   transport: Transport.RMQ,
  //   options: {
  //     urls: [config.getRabbitMQConfig()],
  //     queue: CHANNEL,
  //     queueOptions: { durable: true },
  //   },
  // })
  // client: ClientProxy;

  constructor(
    private readonly commandBus: CommandBus,
    private readonly http: HttpService,
    private readonly queueLog: QueueLogService,
  ) {}

  // async onModuleInit() {
  //   await this.client.connect();
  // }

  // onModuleDestroy() {
  //   this.client.close();
  // }

  // queueRequest(clientId: string, message: string) {
  //   const pattern = { cmd: QUEUE_MESSAGE };
  //   const data: MessageData = { message, clientId };
  //   return this.client.send(pattern, data);
  // }

  async logNote(clientId, payload) {
    return await this.commandBus.execute(new LogNoteCommand(clientId, payload));
  }

  logNoteObservable(payload) {
    this.http
      .get('http://localhost:9000/info')
      .pipe(retry(3))
      .subscribe({
        next: async response => {
          const queue = new (this.queueLog.getModel())();
          queue.clientId = '420'; // take from request
          queue.data = payload;
          queue.response = response.data;
          await this.queueLog.save(queue);
          // Fire webhook;
        },
        error: async err => {
          const queue = new (this.queueLog.getModel())();
          queue.clientId = '420'; // take from request
          queue.data = payload;
          queue.error = err.error;
          await this.queueLog.save(queue);
          // Fire webhook;
        },
      });
    return { message: 'Request Queued' };
  }
}
