import { Module, Global, HttpModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  REGISTERED_CLIENT,
  RegisteredClient,
} from './entities/registered-client/registered-client.schema';
import {
  TOKEN_CACHE,
  TokenCache,
} from './entities/token-cache/token-cache.collection';
import { TokenCacheService } from './entities/token-cache/token-cache.service';
import { RegisteredClientService } from './entities/registered-client/registered-client.service';
import { AuthControllers } from './controllers';
import { AuthAggregates } from './aggregates';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: REGISTERED_CLIENT, schema: RegisteredClient },
      { name: TOKEN_CACHE, schema: TokenCache },
    ]),
    HttpModule,
  ],
  providers: [...AuthAggregates, TokenCacheService, RegisteredClientService],
  controllers: [...AuthControllers],
  exports: [...AuthAggregates, TokenCacheService, RegisteredClientService],
})
export class AuthModule {}
