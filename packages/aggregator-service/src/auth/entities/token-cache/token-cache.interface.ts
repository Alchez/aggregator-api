import { Document } from 'mongoose';

export interface TokenCache extends Document {
  accessToken: string;
  uuid: string;
  active: boolean;
  exp: number;
  sub: string;
  scope: string[];
  roles: string[];
  clientId: string;
}
