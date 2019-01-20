import { Injectable } from '@nestjs/common';
import { TOKEN_CACHE } from './token-cache.collection';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TokenCache } from './token-cache.interface';

@Injectable()
export class TokenCacheService {
  constructor(
    @InjectModel(TOKEN_CACHE)
    private readonly tokenCacheModel: Model<TokenCache>,
  ) {}

  async save(params) {
    const tokenCache = new this.tokenCacheModel(params);
    return await tokenCache.save();
  }

  async find(): Promise<TokenCache[]> {
    return await this.tokenCacheModel.find();
  }

  async findOne(params) {
    return await this.tokenCacheModel.findOne(params);
  }

  async update(query, params) {
    return await this.tokenCacheModel.update(query, params);
  }

  async count() {
    return await this.tokenCacheModel.estimatedDocumentCount();
  }

  async deleteMany(params) {
    return await this.tokenCacheModel.deleteMany(params);
  }
}
