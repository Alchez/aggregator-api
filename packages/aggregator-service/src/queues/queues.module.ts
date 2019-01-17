import { Module, HttpModule } from '@nestjs/common';
import { MicroservicePatternService } from './pattern.service';
import { MicroservicePatternController } from './pattern.controller';

@Module({
  imports: [HttpModule],
  exports: [MicroservicePatternService],
  providers: [MicroservicePatternService],
  controllers: [MicroservicePatternController],
})
export class QueuesModule {}
