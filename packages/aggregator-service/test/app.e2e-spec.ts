import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import 'jest';
import { AppService } from '../src/app.service';
import { AppController } from '../src/app.controller';
// import { AppModule } from '../server/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      // imports: [AppModule],
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: {
            info: (...args) => ({}),
          },
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/info')
      .expect(200)
      .expect({});
  });
});
