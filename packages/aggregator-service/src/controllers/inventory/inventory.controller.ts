import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Req,
  ForbiddenException,
} from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { LogNoteDto } from './inventory-dtos/log-note.dto';
import { TokenGuard } from '../../gaurds/token.guard';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post('log-note-cqrs')
  @UseGuards(TokenGuard)
  @UsePipes(ValidationPipe)
  async logNote(@Body() payload: LogNoteDto, @Req() req) {
    if (req.token.sub) {
      // Not meant to be used by user
      // Only for client apps
      throw new ForbiddenException();
    }
    return await this.inventoryService.logNote(req.token.clientId, payload);
  }

  @Post('log-note-crud')
  @UseGuards(TokenGuard)
  @UsePipes(ValidationPipe)
  testNote(@Body() payload: LogNoteDto, @Req() req) {
    if (req.token.sub) {
      // Not meant to be used by user
      // Only for client apps
      throw new ForbiddenException();
    }
    return this.inventoryService.logNoteObservable(payload);
  }

  // @Post('rmq_test')
  // async rmqTest(@Body() payload) {
  //   return await this.inventoryService.queueRequest('420', payload);
  // }
}
