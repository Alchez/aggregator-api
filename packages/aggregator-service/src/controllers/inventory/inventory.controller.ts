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
import { FireRequestDto } from './inventory-dtos/fire-request.dto';
import { TokenGuard } from '../../guards/token.guard';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post('log-note-cqrs')
  @UseGuards(TokenGuard)
  @UsePipes(ValidationPipe)
  async logNote(@Body() payload: FireRequestDto, @Req() req) {
    if (req.token.sub) {
      // Not meant to be used by user
      // Only for client apps
      throw new ForbiddenException();
    }
    return await this.inventoryService.logNote(req.token.clientId, payload);
  }
}
