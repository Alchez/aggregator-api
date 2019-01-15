import { ConfigService } from '../config/config.service';
import { Settings } from './settings/settings.collection';
import { TokenCache } from './token-cache/token-cache.collection';
import { QueueLog } from './queue-log/queue-log.collection';
import { MongoConnectionOptions } from 'typeorm/driver/mongodb/MongoConnectionOptions';

const config = new ConfigService();

export const TYPEORM_CONNECTION: MongoConnectionOptions = {
  type: 'mongodb',
  host: config.get('MONGODB_HOST'),
  database: config.get('MONGODB_NAME'),
  logging: false,
  entities: [Settings, TokenCache, QueueLog],
  useNewUrlParser: true,
  synchronize: true,
};
