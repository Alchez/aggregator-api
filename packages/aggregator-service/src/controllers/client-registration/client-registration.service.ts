import { Injectable, HttpService, BadRequestException } from '@nestjs/common';
import { SettingsService } from '../../models/settings/settings.service';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of, from, throwError } from 'rxjs';
import { RegisteredClientService } from '../../models/registered-client/registered-client.service';
import { RegisteredClient } from '../../models/registered-client/registered-client.collection';

@Injectable()
export class ClientRegistrationService {
  constructor(
    private readonly http: HttpService,
    private readonly settingsService: SettingsService,
    private readonly registeredCLientService: RegisteredClientService,
  ) {}

  registerClient(clientId: string, webhookURL: string, accessToken: string) {
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
        }
      }),
      switchMap(repsonseClientMap => {
        const { client, response } = repsonseClientMap;
        if (!client) {
          const newClient = new RegisteredClient();
          newClient.clientId = response.data.clientId;
          newClient.clientSecret = response.data.clientSecret;
          newClient.webhookURL = webhookURL;
          newClient.clientId = response.data.clientId;
          return from(this.registeredCLientService.save(newClient));
        } else if (response.data.clientId === client.clientId) {
          return of(client);
        }
      }),
      catchError(error =>
        throwError(new BadRequestException('Invalid Client')),
      ),
    );
  }
}
