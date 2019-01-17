import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { RegisteredClient } from './registered-client.collection';

@Injectable()
export class RegisteredClientService {
  constructor(
    @InjectRepository(RegisteredClient)
    private readonly registeredClientRepository: MongoRepository<
      RegisteredClient
    >,
  ) {}

  async save(params) {
    return await this.registeredClientRepository.save(params);
  }

  async findOne(params) {
    return await this.registeredClientRepository.findOne(params);
  }

  async find() {
    return await this.registeredClientRepository.find();
  }

  async deleteOne(params) {
    return await this.registeredClientRepository.deleteOne(params);
  }

  async deleteMany(params) {
    return await this.registeredClientRepository.deleteMany(params);
  }
}
