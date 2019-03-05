import { RequestAggregationSaga } from './sagas/request-aggregation-saga/request-aggregation-saga.service';
import { QueueLogService } from './entities/queue-log/queue-log.service';
import { TrackAndTraceEvents } from './events/index';
import { Module, OnModuleInit } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QUEUE_LOG, QueueLog } from './entities/queue-log/queue-log.schema';
import { TrackAndTraceCommands } from './commands';
import { TrackAndTraceControllers } from './controllers';
import { TrackAndTraceSagas } from './sagas';
import { CQRSModule, CommandBus, EventBus } from '@nestjs/cqrs';
import { TrackAndTraceAggregates } from './aggregates';
import { ModuleRef } from '@nestjs/core';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: QUEUE_LOG, schema: QueueLog }]),
    CQRSModule,
  ],
  providers: [
    QueueLogService,
    ...TrackAndTraceAggregates,
    ...TrackAndTraceCommands,
    ...TrackAndTraceSagas,
    ...TrackAndTraceEvents,
  ],
  controllers: [...TrackAndTraceControllers],
  exports: [QueueLogService],
})
export class TrackAndTraceModule implements OnModuleInit {
  constructor(
    private readonly moduleRef: ModuleRef,
    private readonly commandBus: CommandBus,
    private readonly eventBus: EventBus,
    private readonly saga: RequestAggregationSaga,
  ) {}

  onModuleInit() {
    this.commandBus.setModuleRef(this.moduleRef);
    this.eventBus.setModuleRef(this.moduleRef);
    this.commandBus.register(TrackAndTraceCommands);
    this.eventBus.register(TrackAndTraceEvents);
    this.eventBus.combineSagas([this.saga.clientRequestFired]);
  }
}
