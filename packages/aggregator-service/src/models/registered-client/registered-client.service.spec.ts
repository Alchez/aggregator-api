import { Test, TestingModule } from '@nestjs/testing';
import { RegisteredClientService } from './registered-client.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RegisteredClient } from './registered-client.collection';

describe('RegisteredClientService', () => {
  let service: RegisteredClientService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RegisteredClientService,
        {
          provide: getRepositoryToken(RegisteredClient),
          useValue: {},
        },
      ],
    }).compile();
    service = module.get<RegisteredClientService>(RegisteredClientService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
