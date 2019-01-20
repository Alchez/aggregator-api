import * as uuidv4 from 'uuid/v4';
import { Schema } from 'mongoose';

export const schema = new Schema(
  {
    uuid: { type: String, default: uuidv4 },
    creation: { type: Date, default: nowDate },
    modified: Date,
    data: String,
    response: Schema.Types.Mixed,
    error: Schema.Types.Mixed,
    clientId: String,
    webhookResponse: Schema.Types.Mixed,
  },
  { collection: 'queue_log', versionKey: false },
);

schema.index({ uuid: 1, clientId: 1 });

export const QueueLog = schema;

export const QUEUE_LOG = 'QueueLog';

function nowDate() {
  return new Date();
}
