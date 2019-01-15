import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenCache } from './token-cache/token-cache.collection';
import { TokenCacheService } from './token-cache/token-cache.service';
import { Settings } from './settings/settings.collection';
import { SettingsService } from './settings/settings.service';
import { QueueLog } from './queue-log/queue-log.collection';
import { QueueLogService } from './queue-log/queue-log.service';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Settings, TokenCache, QueueLog])],
  providers: [SettingsService, TokenCacheService, QueueLogService],
  exports: [SettingsService, TokenCacheService, QueueLogService],
})
export class ModelsModule {}
