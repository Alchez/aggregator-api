import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  const server = express();
  server.use(express.static(join(process.cwd(), 'dist/client')));
  const app = await NestFactory.create(AppModule, server);
  app.enableCors();
  await app.listen(9100);
}
bootstrap();
