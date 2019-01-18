import { Controller, Post, UseGuards, Param, Body } from '@nestjs/common';
import { TokenGuard } from '../../guards/token.guard';
import { RoleGuard } from '../../guards/role.guard';
import { Roles } from '../../decorators/roles.decorator';
import { ADMINISTRATOR } from '../../constants/roles';
import { SetupService } from './setup.service';
import { MANAGEMENT_CONSOLE } from '../../models/settings/service-type';

@Controller('setup')
export class SetupController {
  constructor(private readonly setupService: SetupService) {}

  @Post()
  async setup(@Body() payload) {
    const settings = Object.assign({}, payload);
    settings.type = MANAGEMENT_CONSOLE;
    await this.setupService.setup(payload);
  }

  @Post('service/:type')
  @Roles(ADMINISTRATOR)
  @UseGuards(TokenGuard, RoleGuard)
  async setupServiceByType(@Param('type') type, @Body('appURL') appURL) {
    return await this.setupService.setupServiceByType(type, appURL);
  }
}
