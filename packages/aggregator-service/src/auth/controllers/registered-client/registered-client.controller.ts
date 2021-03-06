import {
  Controller,
  Get,
  UseGuards,
  Req,
  Query,
  Body,
  Param,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Roles } from '../../decorators/roles.decorator';
import { TokenGuard } from '../../guards/token.guard';
import { RoleGuard } from '../../guards/role.guard';
import { ADMINISTRATOR } from '../../../constants/roles';
import { from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UpdateClientDTO } from '../../policies/data-transfer-objects/update-client.dto';
import { PaginateService } from '../../../common/aggregates/paginate/paginate.service';
import { RegisteredClientService } from '../../../auth/entities/registered-client/registered-client.service';

@Controller('registered-client')
export class RegisteredClientController {
  constructor(
    private readonly paginate: PaginateService,
    private readonly registeredService: RegisteredClientService,
  ) {}

  @Get('v1/list')
  @Roles(ADMINISTRATOR)
  @UseGuards(TokenGuard, RoleGuard)
  async list(
    @Req() req,
    @Query('offset') offset: number,
    @Query('limit') limit: number,
    @Query('search') search?: string,
    @Query('sort') sort?: string,
  ) {
    const sortQuery = { name: sort };
    const query: any = {};
    return this.paginate.listPaginate(
      this.registeredService.getModel(),
      offset,
      limit,
      search,
      query,
      ['clientId'],
      sortQuery,
    );
  }

  @Put('v1/update/:clientId')
  @Roles(ADMINISTRATOR)
  @UsePipes(ValidationPipe)
  @UseGuards(TokenGuard, RoleGuard)
  updateWebhookURL(
    @Param('clientId') clientId,
    @Body() payload: UpdateClientDTO,
  ) {
    return from(this.registeredService.findOne({ clientId })).pipe(
      switchMap(registeredClient => {
        registeredClient.webhookURL = payload.webhookURL;
        registeredClient.userKey = payload.userKey;
        registeredClient.licenseNumber = payload.licenseNumber;
        return from(registeredClient.save());
      }),
    );
  }

  @Get('v1/get/:clientId')
  @Roles(ADMINISTRATOR)
  @UseGuards(TokenGuard, RoleGuard)
  getClient(@Param('clientId') clientId) {
    return from(this.registeredService.findOne({ clientId }));
  }
}
