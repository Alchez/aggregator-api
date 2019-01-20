import * as mongoose from 'mongoose';

export const schema = new mongoose.Schema(
  {
    type: String,
    uuid: String,
    appURL: String,
    authServerURL: String,
    clientId: String,
    clientSecret: String,
    profileURL: String,
    tokenURL: String,
    introspectionURL: String,
    authorizationURL: String,
    callbackURLs: [String],
    revocationURL: String,
  },
  { collection: 'settings', versionKey: false },
);

export const Settings = schema;

export const SETTINGS = 'Settings';

export const SettingsModel = mongoose.model(SETTINGS, Settings);
