import { Test, TestingModule } from '@nestjs/testing';
import { InventoryService } from './inventory.service';
import { CommandBus } from '@nestjs/cqrs';
import { HttpService } from '@nestjs/common';
import { QueueLogService } from '../../models/queue-log/queue-log.service';

describe('InventoryService', () => {
  let service: InventoryService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InventoryService,
        CommandBus,
        {
          provide: HttpService,
          useValue: {},
        },
        {
          provide: QueueLogService,
          useValue: {},
        },
      ],
    }).compile();
    service = module.get<InventoryService>(InventoryService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
