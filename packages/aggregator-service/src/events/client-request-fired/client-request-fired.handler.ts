import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ClientRequestFiredEvent } from './client-request-fired.event';
// import { HttpService } from '@nestjs/common';

@EventsHandler(ClientRequestFiredEvent)
export class ClientRequestFiredEventHandler
  implements IEventHandler<ClientRequestFiredEvent> {
  async handle(event: ClientRequestFiredEvent) {
    // const { queueId, clientId, payload } = event;
    // if (clientId) {
    //   // Logic to restrict client from making requests
    // }
    // make request
    // this.http.get('http://localhost:9000/info').subscribe({
    //   next: res => {
    //     queue.response = res.data;
    //   },
    //   error: err => {
    //     queue.error = err.error;
    //   },
    // });
  }
}
