import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenCache } from './token-cache/token-cache.collection';
import { TokenCacheService } from './token-cache/token-cache.service';
import { Settings } from './settings/settings.collection';
import { SettingsService } from './settings/settings.service';
import { QueueLog } from './queue-log/queue-log.collection';
import { QueueLogService } from './queue-log/queue-log.service';
import { RegisteredClientService } from './registered-client/registered-client.service';
import { RegisteredClient } from './registered-client/registered-client.collection';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([
      Settings,
      TokenCache,
      QueueLog,
      RegisteredClient,
    ]),
  ],
  providers: [
    SettingsService,
    TokenCacheService,
    QueueLogService,
    RegisteredClientService,
  ],
  exports: [
    SettingsService,
    TokenCacheService,
    QueueLogService,
    RegisteredClientService,
  ],
})
export class ModelsModule {}
