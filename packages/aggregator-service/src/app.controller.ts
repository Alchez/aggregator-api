import { Get, Controller, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { INDEX_HTML } from './constants/filesystem';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('info')
  info() {
    return this.appService.info();
  }

  @Get('*')
  wildcard(@Res() res) {
    res.sendFile(INDEX_HTML);
  }
}
