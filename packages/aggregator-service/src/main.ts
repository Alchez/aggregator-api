import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/common/enums/transport.enum';
import { ConfigService } from './config/config.service';
import { CHANNEL } from './constants/app-strings';

const config = new ConfigService();

async function bootstrap() {
  const rabbitUrl = config.getRabbitMQConfig();
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [rabbitUrl],
      queue: CHANNEL,
      queueOptions: { durable: true },
    },
  });
  await app.startAllMicroservicesAsync();
  app.enableCors();
  await app.listen(9100);
}
bootstrap();
