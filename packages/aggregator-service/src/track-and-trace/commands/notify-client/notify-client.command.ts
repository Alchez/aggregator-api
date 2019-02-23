import { ICommand } from '@nestjs/cqrs';

export class NotifyClientCommand implements ICommand {
  constructor(
    public readonly clientId: string,
    public readonly queueId: string,
  ) {}
}
