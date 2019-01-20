import { Test, TestingModule } from '@nestjs/testing';
import { InventoryController } from './inventory.controller';
import { InventoryService } from './inventory.service';
import { TokenGuard } from '../../guards/token.guard';

describe('Inventory Controller', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [InventoryController],
      providers: [
        {
          provide: InventoryService,
          useValue: {},
        },
      ],
    })
      .overrideGuard(TokenGuard)
      .useValue({})
      .compile();
  });
  it('should be defined', () => {
    const controller: InventoryController = module.get<InventoryController>(
      InventoryController,
    );
    expect(controller).toBeDefined();
  });
});
