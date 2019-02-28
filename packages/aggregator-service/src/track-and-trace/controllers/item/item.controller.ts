import { TokenGuard } from './../../../auth/guards/token.guard';
import {
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  Body,
  Req,
  Get,
  UseGuards,
} from '@nestjs/common';
import { ItemService } from '../../aggregates/item/item.service';
import { CreateItemDto } from '../../policies/data-transfer-objects/create-item.dto';

@Controller('items')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post('create')
  @UseGuards(TokenGuard)
  @UsePipes(ValidationPipe)
  async createItem(@Body() payload: CreateItemDto, @Req() req) {
    const clientId = req.token.clientId;
    return await this.itemService.createItem(clientId, payload);
  }

  @Get('active')
  @UseGuards(TokenGuard)
  @UsePipes(ValidationPipe)
  async getItems(@Req() req) {
    const clientId = req.token.clientId;
    return await this.itemService.getItems(clientId);
  }

  @Post('callback')
  async callbackItem(@Req() req) {}
}
