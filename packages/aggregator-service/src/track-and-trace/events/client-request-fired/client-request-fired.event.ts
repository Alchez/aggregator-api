import { IEvent } from '@nestjs/cqrs';

export class ClientRequestFiredEvent implements IEvent {
  constructor(
    public readonly clientId: string,
    public readonly payload: any,
    public readonly queueId: string,
  ) {}
}
