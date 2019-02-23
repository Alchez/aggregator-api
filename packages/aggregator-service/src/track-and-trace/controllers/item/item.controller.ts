// import { TokenGuard } from './../../../auth/guards/token.guard';
import {
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  Body,
  Req,
  Get,
  // UseGuards,
} from '@nestjs/common';
import { ItemService } from '../../aggregates/item/item.service';
import { CreateItemDto } from '../../policies/data-transfer-objects/create-item.dto';

@Controller('items')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post('create')
  @UsePipes(ValidationPipe)
  async createItem(@Body() payload: CreateItemDto, @Req() req) {
    const clientId = '29778adb-eae5-4335-b227-a132e0463374'
    return await this.itemService.createItem(clientId, payload);
  }

  @Get('active')
  // @UseGuards(TokenGuard)
  @UsePipes(ValidationPipe)
    async getItems(){
      const clientId = '29778adb-eae5-4335-b227-a132e0463374'
      return await this.itemService.getItems(clientId);
    }

  @Post('callback')
  async callbackItem(@Req() req) {}
}
