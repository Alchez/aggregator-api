import { Injectable, HttpService, BadRequestException } from '@nestjs/common';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of, from, throwError } from 'rxjs';
import { RegisteredClientService } from '../../../auth/entities/registered-client/registered-client.service';
import { SettingsService } from '../../../system-settings/entities/settings/settings.service';

@Injectable()
export class ClientRegistrationService {
  constructor(
    private readonly http: HttpService,
    private readonly settingsService: SettingsService,
    private readonly registeredCLientService: RegisteredClientService,
  ) {}

  registerClient(
    clientId: string,
    webhookURL: string,
    userKey: string,
    licenseNumber: string,
    accessToken: string,
  ) {
    return from(this.settingsService.getServerSettings()).pipe(
      switchMap(settings => {
        return this.http.get(
          settings.authServerURL + '/client/v1/getClientId/' + clientId,
          { headers: { Authorization: 'Bearer ' + accessToken } },
        );
      }),
      switchMap(response => {
        if (response.data) {
          return from(this.registeredCLientService.findOne({ clientId })).pipe(
            map(client => ({ response, client })),
          );
        } else {
          throwError(new BadRequestException('Invalid Client'));
        }
      }),
      switchMap(repsonseClientMap => {
        const { client, response } = repsonseClientMap;
        if (!client) {
          const newClient = new (this.registeredCLientService.getModel())();
          newClient.clientId = response.data.clientId;
          newClient.webhookURL = webhookURL;
          newClient.userKey = userKey;
          newClient.licenseNumber = licenseNumber;
          return from(this.registeredCLientService.save(newClient));
        } else if (response.data.clientId === client.clientId) {
          return of(client);
        }
      }),
      catchError(error => throwError(new BadRequestException())),
    );
  }
}
