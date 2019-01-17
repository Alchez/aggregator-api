import { Column, Entity, ObjectIdColumn, ObjectID } from 'typeorm';
import * as uuidv4 from 'uuid/v4';

@Entity()
export class RegisteredClient {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  type: string; // choose from service-type.ts

  @Column()
  uuid: string;

  @Column()
  clientId: string;

  @Column()
  clientSecret: string;

  @Column()
  webhookURL: string;

  constructor() {
    if (!this.uuid) this.uuid = uuidv4();
  }
}
