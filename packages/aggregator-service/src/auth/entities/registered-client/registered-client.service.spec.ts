import { Test, TestingModule } from '@nestjs/testing';
import { RegisteredClientService } from './registered-client.service';
import { getModelToken } from '@nestjs/mongoose';
import { REGISTERED_CLIENT } from './registered-client.schema';

describe('RegisteredClientService', () => {
  let service: RegisteredClientService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RegisteredClientService,
        {
          provide: getModelToken(REGISTERED_CLIENT),
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
