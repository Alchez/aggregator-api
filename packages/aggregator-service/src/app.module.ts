import { Module, HttpModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TYPEORM_CONNECTION } from './models/typeorm.connection';
import { ConfigModule } from './config/config.module';
import { ModelsModule } from './models/models.module';
import { ControllersModule } from './controllers/controllers.module';

@Module({
  imports: [
    ConfigModule,
    HttpModule,
    ModelsModule,
    ControllersModule,
    // QueuesModule, // For RabbitMQ
    TypeOrmModule.forRoot(TYPEORM_CONNECTION),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
