import { ICommand } from '@nestjs/cqrs';
import { FireRequestDto } from '../../controllers/inventory/inventory-dtos/fire-request.dto';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';

export class FireRequestCommand implements ICommand {
  constructor(
    public readonly clientId: string,
    public readonly body: FireRequestDto,
    public readonly request: Observable<AxiosResponse<any>>,
  ) {}
}
