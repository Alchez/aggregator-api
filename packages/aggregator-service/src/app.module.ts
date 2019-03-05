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

@Module({
  imports: [
    ConfigModule,
    HttpModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => {
        const uri = `mongodb://${config.get('DB_USER')}:${config.get(
          'DB_PASSWORD',
        )}@${config.get('DB_HOST')}/${config.get('DB_NAME')}`;
        return {
          uri,
          useNewUrlParser: true,
        };
      },
      inject: [ConfigService],
    }),
    AuthModule,
    TrackAndTraceModule,
    CommonModule,
    SystemSettingsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
