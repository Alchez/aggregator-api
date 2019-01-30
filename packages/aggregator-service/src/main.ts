import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import * as fs from 'fs';
import { join } from 'path';

function setupSwagger(app: INestApplication) {
  const packageJson = JSON.parse(
    fs.readFileSync(join(process.cwd(), 'package.json'), 'utf-8'),
  );

  const options = new DocumentBuilder()
    .setTitle(packageJson.name)
    .setDescription(packageJson.description)
    .setVersion(packageJson.version)
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setupSwagger(app);

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
