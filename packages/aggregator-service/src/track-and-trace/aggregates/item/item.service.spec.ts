import { Test, TestingModule } from '@nestjs/testing';
import { ItemService } from './item.service';
import { CommandBus } from '@nestjs/cqrs';

describe('ItemService', () => {
  let service: ItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ItemService,
        {
          provide: CommandBus,
          useFactory: () => jest.fn(),
        },
      ],
    }).compile();

    service = module.get<ItemService>(ItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
