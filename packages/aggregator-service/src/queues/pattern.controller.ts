import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { QUEUE_MESSAGE } from '../constants/app-strings';
import { MicroservicePatternService } from './pattern.service';
import { MessageData } from './message-data.interface';

@Controller()
export class MicroservicePatternController {
  constructor(private readonly patternService: MicroservicePatternService) {}
  @MessagePattern({ cmd: QUEUE_MESSAGE })
  async queueMessage(data: MessageData) {
    return await this.patternService.processMessage(data);
  }
}
