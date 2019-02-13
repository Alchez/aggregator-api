import {
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  Body,
  Req,
} from '@nestjs/common';
import { ItemService } from './item.service';
import { CreateItemDto } from './dto/create-item.dto';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post('create')
  @UsePipes(ValidationPipe)
  async createItem(@Body() payload: CreateItemDto) {
    return await this.itemService.createItem(
      'de22cc49-b58a-4116-ab9d-887026af906f',
      payload,
    );
  }

  @Post('callback')
  async callbackItem(@Req() req) {}
}
