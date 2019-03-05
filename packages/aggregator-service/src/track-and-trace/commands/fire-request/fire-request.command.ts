import { ICommand } from '@nestjs/cqrs';

export class FireRequestCommand implements ICommand {
  constructor(
    public readonly clientId: string,
    public readonly endpoint: string,
    public readonly body: any,
  ) {}
}
