import { Module, HttpModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { ModelsModule } from './models/models.module';
import { ControllersModule } from './controllers/controllers.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from './config/config.service';

const config = new ConfigService();

@Module({
  imports: [
    ConfigModule,
    HttpModule,
    ModelsModule,
    ControllersModule,
    // QueuesModule, // For RabbitMQ
    MongooseModule.forRoot(
      `mongodb://${config.get('DB_HOST')}/${config.get('DB_NAME')}`,
      {
        useNewUrlParser: true,
        // https://github.com/Automattic/mongoose/issues/6890#issuecomment-416410444
        useCreateIndex: true,
      },
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
