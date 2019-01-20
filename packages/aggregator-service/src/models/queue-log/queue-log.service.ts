import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { QueueLog } from './queue-log.interface';
import { QUEUE_LOG } from './queue-log.schema';

@Injectable()
export class QueueLogService {
  constructor(
    @InjectModel(QUEUE_LOG)
    private readonly queueLogModel: Model<QueueLog>,
  ) {}

  async save(params) {
    const queueLog = new this.queueLogModel(params);
    return await queueLog.save();
  }

  async findOne(params) {
    return await this.queueLogModel.findOne(params);
  }

  async find() {
    return await this.queueLogModel.find().exec();
  }

  getModel() {
    return this.queueLogModel;
  }
}
