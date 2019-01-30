import { Injectable, HttpService } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { FireRequestCommand } from '../../commands/fire-request/fire-request.command';

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
    const request = this.http.get('http://localhost:7100/info');
    return await this.commandBus.execute(
      new FireRequestCommand(clientId, payload, request),
    );
  }
}
