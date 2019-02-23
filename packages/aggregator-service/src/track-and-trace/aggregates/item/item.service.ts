import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { FireRequestCommand } from '../../commands/fire-request/fire-request.command';
import { CREATE_ITEM_ENDPOINT } from '../../../constants/metrc-endpoints';

@Injectable()
export class ItemService {
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
        body,
        payload.userKey,
        payload.licenseNumber,
      ),
    );
  }
}
