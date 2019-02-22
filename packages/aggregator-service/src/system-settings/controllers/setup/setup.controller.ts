import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SetupService } from '../../aggregates/setup/setup.service';
import { SettingsDto } from '../../../system-settings/entities/settings/settings.dto';

@Controller('setup')
export class SetupController {
  constructor(private readonly setupService: SetupService) {}

  @Post()
  @UsePipes(ValidationPipe)
  setup(@Body() payload: SettingsDto) {
    return this.setupService.setup(payload);
  }
}
