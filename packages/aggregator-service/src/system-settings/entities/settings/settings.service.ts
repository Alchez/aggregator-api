import { Injectable } from '@nestjs/common';
import { SETTINGS } from './settings.schema';
import { from, throwError } from 'rxjs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Settings } from './settings.interface';
import { switchMap, map } from 'rxjs/operators';
import { settingsAlreadyExists } from '../../../constants/exceptions';

@Injectable()
export class SettingsService {
  constructor(
    @InjectModel(SETTINGS)
    private readonly settingsModel: Model<Settings>,
  ) {}

  save(params) {
    return from(this.settingsModel.find().exec()).pipe(
      switchMap(settings => {
        if (settings.length > 0) {
          return throwError(settingsAlreadyExists);
        } else {
          const newSettings = new this.settingsModel(params);
          return from(newSettings.save()).pipe(
            map(data => {
              data.set('clientSecret', undefined);
              return data;
            }),
          );
        }
      }),
    );
  }

  async findByType(type): Promise<Settings> {
    return await this.settingsModel.findOne({ type });
  }

  async findOne(params) {
    return await this.settingsModel.findOne(params);
  }

  async update(query, params) {
    return await this.settingsModel.update(query, params);
  }

  async count() {
    return this.settingsModel.estimatedDocumentCount();
  }

  async findAll() {
    return await this.settingsModel.find();
  }

  async find() {
    return await this.settingsModel.findOne({});
  }

  getServerSettings() {
    return from(this.findOne({}));
  }
}
