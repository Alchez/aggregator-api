import { ConfigService } from '../config/config.service';
import { Settings } from './settings/settings.collection';
import { TokenCache } from './token-cache/token-cache.collection';
import { MongoConnectionOptions } from 'typeorm/driver/mongodb/MongoConnectionOptions';

const config = new ConfigService();

export const TYPEORM_CONNECTION: MongoConnectionOptions = {
  type: 'mongodb',
  host: config.get('DB_HOST'),
  database: config.get('DB_NAME'),
  username: config.get('DB_USER'),
  password: config.get('DB_PASSWORD'),
  logging: false,
  entities: [Settings, TokenCache],
  useNewUrlParser: true,
  synchronize: true,
};
