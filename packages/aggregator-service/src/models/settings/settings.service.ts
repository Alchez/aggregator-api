import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Settings } from './settings.collection';
import { settingsAlreadyExists } from '../../constants/exceptions';
import { from } from 'rxjs';

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(Settings)
    private readonly settingsRepository: Repository<Settings>,
  ) {}

  async save(params) {
    const serverSettings = await this.settingsRepository.find({
      type: params.type,
    });

    if (serverSettings.length > 0) {
      throw settingsAlreadyExists;
    }
    return await this.settingsRepository.save(params);
  }

  async findByType(type): Promise<Settings> {
    return await this.settingsRepository.findOne({ type });
  }

  async findOne(params) {
    return await this.settingsRepository.findOne(params);
  }

  async update(query, params) {
    return await this.settingsRepository.update(query, params);
  }

  async count() {
    return this.settingsRepository.count();
  }

  async findAll() {
    return await this.settingsRepository.find();
  }

  getServerSettings() {
    return from(this.findOne({}));
  }
}
