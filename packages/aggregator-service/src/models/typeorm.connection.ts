import { ConfigService } from '../config/config.service';
import { Settings } from './settings/settings.collection';
import { TokenCache } from './token-cache/token-cache.collection';
import { QueueLog } from './queue-log/queue-log.collection';
import { MongoConnectionOptions } from 'typeorm/driver/mongodb/MongoConnectionOptions';
import { RegisteredClient } from './registered-client/registered-client.collection';

const config = new ConfigService();

export const TYPEORM_CONNECTION: MongoConnectionOptions = {
  type: 'mongodb',
  host: config.get('DB_HOST'),
  database: config.get('DB_NAME'),
  logging: false,
  entities: [Settings, TokenCache, QueueLog, RegisteredClient],
  useNewUrlParser: true,
  synchronize: true,
};
