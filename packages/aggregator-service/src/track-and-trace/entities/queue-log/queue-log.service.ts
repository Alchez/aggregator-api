import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { QueueLog } from './queue-log.interface';
import { QUEUE_LOG } from './queue-log.schema';
import { AggregateRoot } from '@nestjs/cqrs';
import { ClientRequestFiredEvent } from '../../events/client-request-fired/client-request-fired.event';

@Injectable()
export class QueueLogService extends AggregateRoot {
  constructor(
    @InjectModel(QUEUE_LOG)
    private readonly queueLogModel: Model<QueueLog>,
  ) {
    super();
  }

  async saveRequest(params) {
    const queueLog = new this.queueLogModel(params);
    return await queueLog.save();
  }

  async findOne(params) {
    return await this.queueLogModel.findOne(params);
  }

  async find() {
    return await this.queueLogModel.find().exec();
  }

  async saveResponse(params) {
    const queueLog = new this.queueLogModel(params);
    await queueLog.save();
    this.apply(
      new ClientRequestFiredEvent(
        queueLog.clientId,
        queueLog.data,
        queueLog.uuid,
      ),
    );
    return queueLog;
  }

  async saveError(params) {
    const queueLog = new this.queueLogModel(params);
    await queueLog.save();
    this.apply(
      new ClientRequestFiredEvent(
        queueLog.clientId,
        queueLog.error,
        queueLog.uuid,
      ),
    );
    return queueLog;
  }

  async saveWebhookResponse(params) {
    const queueLog = new this.queueLogModel(params);
    return await queueLog.save();
  }

  getModel() {
    return this.queueLogModel;
  }
}
