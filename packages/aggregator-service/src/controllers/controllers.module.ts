import { Module, HttpModule, OnModuleInit } from '@nestjs/common';
import { SetupService } from './setup/setup.service';
import { SetupController } from './setup/setup.controller';
import { CQRSModule, CommandBus, EventBus } from '@nestjs/cqrs';
import { ClientRequestFiredEventHandler } from '../events/client-request-fired/client-request-fired.handler';
import { ModuleRef } from '@nestjs/core';
import { ClientRegistrationController } from './client-registration/client-registration.controller';
import { ClientRegistrationService } from './client-registration/client-registration.service';
import { RegisteredClientController } from './registered-client/registered-client.controller';
import { SettingsController } from './settings/settings.controller';
import { SettingsManagementService } from './settings/settings-management.service';
import { RequestAggregationSaga } from '../sagas/request-aggregation-saga/request-aggregation-saga.service';
import { FireRequestHandler } from '../commands/fire-request/fire-request.handler';
import { NotifyClientHandler } from '../commands/notify-client/notify-client.handler';
import { ItemController } from './item/item.controller';
import { ItemService } from './item/item.service';

@Module({
  imports: [HttpModule, CQRSModule],
  exports: [SetupService],
  controllers: [
    SetupController,
    ClientRegistrationController,
    RegisteredClientController,
    SettingsController,
    ItemController,
  ],
  providers: [
    SetupService,
    FireRequestHandler,
    NotifyClientHandler,
    ClientRequestFiredEventHandler,
    RequestAggregationSaga,
    ClientRegistrationService,
    SettingsManagementService,
    ItemService,
  ],
})
export class ControllersModule implements OnModuleInit {
  constructor(
    private readonly moduleRef: ModuleRef,
    private readonly command$: CommandBus,
    private readonly event$: EventBus,
    private readonly sagas: RequestAggregationSaga,
  ) {}

  onModuleInit() {
    this.command$.setModuleRef(this.moduleRef);
    this.event$.setModuleRef(this.moduleRef);

    this.command$.register([FireRequestHandler, NotifyClientHandler]);
    this.event$.register([ClientRequestFiredEventHandler]);
    this.event$.combineSagas([this.sagas.clientRequestFired]);
  }
}
