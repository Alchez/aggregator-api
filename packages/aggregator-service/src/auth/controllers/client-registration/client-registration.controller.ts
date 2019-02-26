import {
  Controller,
  Post,
  Param,
  Req,
  UseGuards,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ClientRegistrationService } from '../../aggregates/client-registration/client-registration.service';
import { TokenGuard } from '../../guards/token.guard';
import { Roles } from '../../decorators/roles.decorator';
import { ADMINISTRATOR } from '../../../constants/roles';
import { RoleGuard } from '../../guards/role.guard';
import { ClientRegistrationDto } from '../../policies/data-transfer-objects/client-registration.dto';

@Controller('client-registration')
export class ClientRegistrationController {
  constructor(
    private readonly clientRegistrationService: ClientRegistrationService,
  ) {}

  @Post('register/:clientId')
  @Roles(ADMINISTRATOR)
  @UsePipes(ValidationPipe)
  @UseGuards(TokenGuard, RoleGuard)
  registerClient(
    @Param('clientId') clientId,
    @Req() req,
    @Body() payload: ClientRegistrationDto,
  ) {
    return this.clientRegistrationService.registerClient(
      clientId,
      payload.webhookURL,
      payload.userKey,
      payload.licenseNumber,
      req.token.accessToken,
    );
  }
}
