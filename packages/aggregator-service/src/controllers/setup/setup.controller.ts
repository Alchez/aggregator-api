import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SetupService } from './setup.service';
import { SettingsDto } from '../../models/settings/settings.dto';

@Controller('setup')
export class SetupController {
  constructor(private readonly setupService: SetupService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async setup(@Body() payload: SettingsDto) {
    await this.setupService.setup(payload);
  }
}
