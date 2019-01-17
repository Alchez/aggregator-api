import { ICommand } from '@nestjs/cqrs';
import { LogNoteDto } from '../../controllers/inventory/inventory-dtos/log-note.dto';

export class LogNoteCommand implements ICommand {
  constructor(
    public readonly clientId: string,
    public readonly body: LogNoteDto,
  ) {}
}
