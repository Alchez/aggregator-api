import {
  Module,
  HttpModule,
  NestModule,
  MiddlewareConsumer,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TYPEORM_CONNECTION } from './models/typeorm.connection';
import { ConfigModule } from './config/config.module';
import { ModelsModule } from './models/models.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SetupController } from './controllers/setup/setup.controller';
import { SetupService } from './controllers/setup/setup.service';
import { SettingsController } from './controllers/settings/settings.controller';
import { SettingsManagementService } from './controllers/settings/settings-management.service';
import { INDEX_HTML } from './constants/filesystem';

@Module({
  imports: [
    ConfigModule,
    HttpModule,
    ModelsModule,
    TypeOrmModule.forRoot(TYPEORM_CONNECTION),
  ],
  controllers: [AppController, SetupController, SettingsController],
  providers: [AppService, SetupService, SettingsManagementService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply((req, res, next) => {
        res.sendFile(INDEX_HTML);
      })
      .forRoutes('/registered-client*');
  }
}
