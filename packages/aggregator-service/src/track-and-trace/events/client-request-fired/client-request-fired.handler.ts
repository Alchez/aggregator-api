import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ClientRequestFiredEvent } from './client-request-fired.event';

@EventsHandler(ClientRequestFiredEvent)
export class ClientRequestFiredEventHandler
  implements IEventHandler<ClientRequestFiredEvent> {
  async handle(event: ClientRequestFiredEvent) {
    // Store event to RabbitMQ
  }
}
