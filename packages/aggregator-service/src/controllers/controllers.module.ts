import { Module, HttpModule, OnModuleInit } from '@nestjs/common';
import { SetupService } from './setup/setup.service';
import { SetupController } from './setup/setup.controller';
import { InventoryController } from './inventory/inventory.controller';
import { InventoryService } from './inventory/inventory.service';
import { CQRSModule, CommandBus, EventBus } from '@nestjs/cqrs';
import { ClientRequestFiredEventHandler } from '../events/client-request-fired/client-request-fired.handler';
import { LogNoteHandler } from '../commands/log-note/log-note.handler';
import { ModuleRef } from '@nestjs/core';
import { BloomRequestSagas } from './bloom-request.saga';
import { ClientRegistrationController } from './client-registration/client-registration.controller';
import { ClientRegistrationService } from './client-registration/client-registration.service';

@Module({
  imports: [HttpModule, CQRSModule],
  exports: [SetupService, InventoryService],
  controllers: [
    SetupController,
    InventoryController,
    ClientRegistrationController,
  ],
  providers: [
    SetupService,
    InventoryService,
    LogNoteHandler,
    ClientRequestFiredEventHandler,
    BloomRequestSagas,
    ClientRegistrationService,
  ],
})
export class ControllersModule implements OnModuleInit {
  constructor(
    private readonly moduleRef: ModuleRef,
    private readonly command$: CommandBus,
    private readonly event$: EventBus,
    private readonly bloomRequestSagas: BloomRequestSagas,
  ) {}

  onModuleInit() {
    this.command$.setModuleRef(this.moduleRef);
    this.event$.setModuleRef(this.moduleRef);

    this.command$.register([LogNoteHandler]);
    this.event$.register([ClientRequestFiredEventHandler]);
    this.event$.combineSagas([this.bloomRequestSagas.requestFired]);
  }
}
