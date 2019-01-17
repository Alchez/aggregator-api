import { Injectable, HttpService } from '@nestjs/common';
import { SettingsService } from '../../models/settings/settings.service';
import { switchMap } from 'rxjs/operators';
import { of, from } from 'rxjs';
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
    return this.settingsService.getServerSettings().pipe(
      switchMap(settings => {
        return this.http.get(
          settings.authServerURL + '/client/v1/getClientId/' + clientId,
          { headers: { Authorization: 'Bearer ' + accessToken } },
        );
      }),
      switchMap(response => {
        if (response.status === 200 && response.data) {
          const registeredClient = new RegisteredClient();
          registeredClient.clientId = response.data.clientId;
          registeredClient.clientSecret = response.data.clientSecret;
          registeredClient.webhookURL = webhookURL;
          registeredClient.clientId = response.data.clientId;
          return from(this.registeredCLientService.save(registeredClient));
        }
        return of({ message: 'invalid_response' });
      }),
    );
  }
}
