import { Module, HttpModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from './config/config.service';
import { AuthModule } from './auth/auth.module';
import { TrackAndTraceModule } from './track-and-trace/track-and-trace.module';
import { CommonModule } from './common/common.module';
import { SystemSettingsModule } from './system-settings/system-settings.module';

const config = new ConfigService();

@Module({
  imports: [
    ConfigModule,
    HttpModule,
    MongooseModule.forRoot(
      `mongodb://${config.get('DB_HOST')}/${config.get('DB_NAME')}`,
      {
        useNewUrlParser: true,
        // https://github.com/Automattic/mongoose/issues/6890#issuecomment-416410444
        useCreateIndex: true,
      },
    ),
    AuthModule,
    TrackAndTraceModule,
    CommonModule,
    SystemSettingsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
