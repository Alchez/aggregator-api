import { ForbiddenException, HttpService } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { from, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { RegisteredClientService } from '../../../auth/entities/registered-client/registered-client.service';
import { ConfigService } from '../../../config/config.service';
import { FireGetRequestCommand } from './fire-get-request.command';

@CommandHandler(FireGetRequestCommand)
export class FireRequestHandler
  implements ICommandHandler<FireGetRequestCommand> {
  constructor(
    private readonly registeredClientService: RegisteredClientService,
    private readonly http: HttpService,
    private readonly config: ConfigService,
  ) {}

  async execute(commandData: FireGetRequestCommand, resolve: (value?) => void) {
    const { clientId, endpoint } = commandData;
    const VENDOR_KEY = this.config.get('VENDOR_KEY');

    from(this.registeredClientService.findOne({ clientId }))
      .pipe(
        switchMap(foundClient => {
          if (!foundClient) {
            return throwError(
              // Why have this validation if we have a guard at the controller level?
              new ForbiddenException('Client Access Forbidden'),
            );
          }
          return this.http.get(endpoint, {
            auth: {
              username: VENDOR_KEY,
              password: foundClient.userKey,
            },
            params: { licenseNumber: foundClient.licenseNumber },
          });
        }),
        switchMap(response => {
          return response.data;
        }),
        catchError(error => {
          return error;
        }),
      )
      .subscribe({
        next: async resolvedQueue => {
          // Callback for success
        },
        error: error => {
          // Callback for error
        },
      });
  }
}
