import { Document } from 'mongoose';

export interface QueueLog extends Document {
  uuid?: string;
  creation?: Date;
  modified?: Date;
  data?: any;
  response?: any;
  error?: any;
  clientId?: string;
  webhookResponse?: any;
}
