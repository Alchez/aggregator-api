import { Document } from 'mongoose';

export interface RegisteredClient extends Document {
  uuid?: string;
  clientId?: string;
  clientSecret?: string;
  webhookURL?: string;
}
