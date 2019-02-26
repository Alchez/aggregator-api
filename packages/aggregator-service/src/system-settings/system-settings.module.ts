import { Module, Global } from '@nestjs/common';
import { SystemSettingsControllers } from './controllers';
import { MongooseModule } from '@nestjs/mongoose';
import { SETTINGS, Settings } from './entities/settings/settings.schema';
import { SettingsService } from './entities/settings/settings.service';
import { SystemSettingsAggregates } from './aggregates';

@Global()
@Module({
  imports: [MongooseModule.forFeature([{ name: SETTINGS, schema: Settings }])],
  providers: [
    ...SystemSettingsControllers,
    ...SystemSettingsAggregates,
    SettingsService,
  ],
  controllers: [...SystemSettingsControllers],
  exports: [...SystemSettingsAggregates, SettingsService],
})
export class SystemSettingsModule {}
