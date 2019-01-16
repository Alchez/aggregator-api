import { Module, HttpModule } from '@nestjs/common';
import { SetupService } from './setup/setup.service';
import { SetupController } from './setup/setup.controller';
import { InventoryController } from './inventory/inventory.controller';
import { InventoryService } from './inventory/inventory.service';

@Module({
  imports: [HttpModule],
  controllers: [SetupController, InventoryController],
  providers: [SetupService, InventoryService],
})
export class ControllersModule {}
