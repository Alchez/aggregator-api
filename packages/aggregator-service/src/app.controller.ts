import { Get, Controller, SerializeOptions } from '@nestjs/common';
import { AppService } from './app.service';
import { SERVICE_NAME } from './constants/app-strings';

@Controller()
@SerializeOptions({ excludePrefixes: ['_'] })
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('info')
  info() {
    return this.appService.info();
  }

  @Get('info/service')
  serviceInfo() {
    return { service: SERVICE_NAME };
  }
}
