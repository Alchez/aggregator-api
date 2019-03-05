import { ICommand } from '@nestjs/cqrs';

export class FireGetRequestCommand implements ICommand {
  constructor(
    public readonly endpoint: string,
    public readonly clientId: string,
  ) {}
}
