import * as mongoose from 'mongoose';
import * as uuidv4 from 'uuid/v4';

export const schema = new mongoose.Schema(
  {
    uuid: { type: String, default: uuidv4 },
    clientId: String,
    clientSecret: String,
    webhookURL: String,
  },
  { collection: 'registered_client', versionKey: false },
);

export const RegisteredClient = schema;

export const REGISTERED_CLIENT = 'RegisteredClient';

export const RegisteredClientModel = mongoose.model(
  REGISTERED_CLIENT,
  RegisteredClient,
);
