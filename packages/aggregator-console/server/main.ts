import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { join } from 'path';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import * as fs from 'fs';

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
  const server = express();
  server.use(express.static(join(process.cwd(), 'dist/aggregator-console')));
  const app = await NestFactory.create(AppModule, server);
  setupSwagger(app);

  app.enableCors();
  await app.listen(8100);
}

bootstrap();
