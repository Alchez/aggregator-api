import { Injectable } from '@nestjs/common';
import { MessageData } from './message-data.interface';

@Injectable()
export class MicroservicePatternService {
  constructor() {}

  async processMessage(data: MessageData) {
    const { message, clientId } = data;
    return { message, clientId };
  }
}
