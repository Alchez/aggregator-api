import { Module, HttpModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TYPEORM_CONNECTION } from './models/typeorm.connection';
import { ConfigModule } from './config/config.module';
import { ModelsModule } from './models/models.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SetupController } from './controllers/setup/setup.controller';
import { SetupService } from './controllers/setup/setup.service';

@Module({
  imports: [
    ConfigModule,
    HttpModule,
    ModelsModule,
    TypeOrmModule.forRoot(TYPEORM_CONNECTION),
  ],
  controllers: [AppController, SetupController],
  providers: [AppService, SetupService],
})
export class AppModule {}
