import * as mongoose from 'mongoose';

export const schema = new mongoose.Schema(
  {
    accessToken: String,
    uuid: String,
    active: Boolean,
    exp: Number,
    sub: String,
    scope: [String],
    roles: [String],
    clientId: String,
  },
  { collection: 'token_cache', versionKey: false },
);

schema.index({ uuid: 1, clientId: 1, sub: 1 });

export const TokenCache = schema;

export const TOKEN_CACHE = 'TokenCache';

export const TokenCacheModel = mongoose.model(TOKEN_CACHE, TokenCache);
