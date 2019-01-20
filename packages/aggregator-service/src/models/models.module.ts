import { Module, Global } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TokenCacheService } from './token-cache/token-cache.service';
import { SettingsService } from './settings/settings.service';
import { QueueLogService } from './queue-log/queue-log.service';
import { RegisteredClientService } from './registered-client/registered-client.service';
import { QUEUE_LOG, QueueLog } from './queue-log/queue-log.schema';
import {
  REGISTERED_CLIENT,
  RegisteredClient,
} from './registered-client/registered-client.schema';
import { SETTINGS, Settings } from './settings/settings.schema';
import { TOKEN_CACHE, TokenCache } from './token-cache/token-cache.collection';
import { PaginateService } from './paginate/paginate.service';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SETTINGS, schema: Settings },
      { name: QUEUE_LOG, schema: QueueLog },
      { name: REGISTERED_CLIENT, schema: RegisteredClient },
      { name: TOKEN_CACHE, schema: TokenCache },
    ]),
  ],
  providers: [
    SettingsService,
    TokenCacheService,
    QueueLogService,
    RegisteredClientService,
    PaginateService,
  ],
  exports: [
    SettingsService,
    TokenCacheService,
    QueueLogService,
    RegisteredClientService,
    PaginateService,
  ],
})
export class ModelsModule {}
