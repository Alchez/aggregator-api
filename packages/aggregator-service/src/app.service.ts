import { Injectable } from '@nestjs/common';
import { SetupService } from './controllers/setup/setup.service';

@Injectable()
export class AppService {
  constructor(private readonly setupService: SetupService) {}

  async info() {
    return await this.setupService.getInfo();
  }
}
