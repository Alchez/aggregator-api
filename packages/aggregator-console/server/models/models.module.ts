import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenCache } from './token-cache/token-cache.collection';
import { TokenCacheService } from './token-cache/token-cache.service';
import { Settings } from './settings/settings.collection';
import { SettingsService } from './settings/settings.service';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Settings, TokenCache])],
  providers: [SettingsService, TokenCacheService],
  exports: [SettingsService, TokenCacheService],
})
export class ModelsModule {}
