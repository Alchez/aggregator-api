import { Entity, Column, ObjectID, ObjectIdColumn } from 'typeorm';
import * as uuidv4 from 'uuid/v4';
import { AggregateRoot } from '@nestjs/cqrs';
import { ClientRequestFiredEvent } from '../../events/client-request-fired/client-request-fired.event';

@Entity()
export class QueueLog extends AggregateRoot {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  uuid: string;

  @Column()
  data: any | string;

  @Column()
  response: any | string;

  @Column()
  error: any | string;

  @Column()
  clientId: string;

  @Column()
  webhookResponse: any | string;

  constructor() {
    super();
    if (!this.uuid) this.uuid = uuidv4();
  }

  requestFired(clientId: string, payload) {
    // logic
    this.apply(new ClientRequestFiredEvent(clientId, payload, this.uuid));
  }
}
