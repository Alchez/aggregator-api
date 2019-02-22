import { Injectable } from '@nestjs/common';
import { REGISTERED_CLIENT } from './registered-client.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisteredClient } from './registered-client.interface';

@Injectable()
export class RegisteredClientService {
  constructor(
    @InjectModel(REGISTERED_CLIENT)
    private readonly registeredClientModel: Model<RegisteredClient>,
  ) {}

  async save(params) {
    const registeredClient = new this.registeredClientModel(params);
    return await registeredClient.save();
  }

  async findOne(params) {
    return await this.registeredClientModel.findOne(params);
  }

  async find() {
    return await this.registeredClientModel.find().exec();
  }

  async deleteOne(params) {
    return await this.registeredClientModel.deleteOne(params);
  }

  async deleteMany(params) {
    return await this.registeredClientModel.deleteMany(params);
  }

  getModel() {
    return this.registeredClientModel;
  }
}
