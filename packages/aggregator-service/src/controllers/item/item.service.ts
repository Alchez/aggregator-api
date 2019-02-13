import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { FireRequestCommand } from '../../commands/fire-request/fire-request.command';

@Injectable()
export class ItemService {
  constructor(private readonly commandBus: CommandBus) {}

  async createItem(clientId, payload) {
    const ENDPOINT = 'https://sandbox-api-ca.metrc.com/items/v1/create';
    const body = {
      Name: payload.itemName,
      ItemCategory: payload.itemCategory,
      UnitOfMeasure: payload.unitOfMeasure,
      Strain: payload.strain,
    };
    return await this.commandBus.execute(
      new FireRequestCommand(
        clientId,
        ENDPOINT,
        body,
        payload.userKey,
        payload.licenseNumber,
      ),
    );
  }
}
