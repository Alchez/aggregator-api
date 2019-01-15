import { Column, Entity, BaseEntity, ObjectIdColumn, ObjectID } from 'typeorm';
import * as uuidv4 from 'uuid/v4';

@Entity()
export class Settings extends BaseEntity {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  type: string; // choose from service-type.ts

  @Column()
  uuid: string;

  @Column()
  appURL: string;

  @Column()
  authServerURL: string;

  @Column()
  clientId: string;

  @Column()
  clientSecret: string;

  @Column()
  profileURL: string;

  @Column()
  tokenURL: string;

  @Column()
  introspectionURL: string;

  @Column()
  authorizationURL: string;

  @Column()
  callbackURLs: string[];

  @Column()
  revocationURL: string;

  constructor() {
    super();
    if (!this.uuid) this.uuid = uuidv4();
  }
}
