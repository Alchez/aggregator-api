import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Uncomment to connect RabbitMQ
  // const config = new ConfigService();
  // const rabbitUrl = config.getRabbitMQConfig();
  // app.connectMicroservice({
  //   transport: Transport.RMQ,
  //   options: {
  //     urls: [rabbitUrl],
  //     queue: CHANNEL,
  //     queueOptions: { durable: true },
  //   },
  // });
  // await app.startAllMicroservicesAsync();

  app.enableCors();
  await app.listen(7100);
}
bootstrap();
