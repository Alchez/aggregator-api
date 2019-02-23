import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CREATE_ITEM as CREATE_ITEM_ENDPOINT, GET_ITEMS as GET_ITEMS_ENDPOINT } from '../../../constants/metrc-endpoints';
import { FireRequestCommand } from '../../commands/fire-request/fire-request.command';
import { FireGetRequestCommand } from 'src/track-and-trace/commands/fire-get-request/fire-get-request.command';

@Injectable()
export class ItemService {
  async getItems(clientId) {
    return await this.commandBus.execute(
      new FireGetRequestCommand(
        GET_ITEMS_ENDPOINT,
        clientId,
      ),
    );
  }
  constructor(private readonly commandBus: CommandBus) {}

  async createItem(clientId, payload) {
    const body = {
      Name: payload.itemName,
      ItemCategory: payload.itemCategory,
      UnitOfMeasure: payload.unitOfMeasure,
      Strain: payload.strain,
    };
    return await this.commandBus.execute(
      new FireRequestCommand(
        clientId,
        CREATE_ITEM_ENDPOINT,
        body
      ),
    );
  }
}
