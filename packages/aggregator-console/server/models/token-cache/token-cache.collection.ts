import { Entity, BaseEntity, Column, ObjectIdColumn, ObjectID } from 'typeorm';
import * as uuidv4 from 'uuid/v4';

@Entity()
export class TokenCache extends BaseEntity {
  @ObjectIdColumn()
  _id: ObjectID;
  @Column()
  accessToken: string;
  @Column()
  uuid: string;
  @Column()
  active: boolean;
  @Column()
  exp: number;
  @Column()
  sub: string;
  @Column({ type: 'json' })
  scope: JSON;
  @Column({ type: 'json' })
  roles: JSON;
  @Column()
  clientId: string;
  constructor() {
    super();
    if (!this.uuid) this.uuid = uuidv4();
  }
}
