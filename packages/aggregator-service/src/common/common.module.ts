import { Module, Global } from '@nestjs/common';
import { CommonAggregates } from './aggregates';

@Global()
@Module({
  providers: [...CommonAggregates],
  exports: [...CommonAggregates],
})
export class CommonModule {}
