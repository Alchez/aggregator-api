import { Test, TestingModule } from '@nestjs/testing';
import { QueueLogService } from './queue-log.service';
import { getModelToken } from '@nestjs/mongoose';
import { QUEUE_LOG } from './queue-log.schema';

describe('QueueLogService', () => {
  let service: QueueLogService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QueueLogService,
        {
          provide: getModelToken(QUEUE_LOG),
          useValue: {},
        },
      ],
    }).compile();
    service = module.get<QueueLogService>(QueueLogService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
