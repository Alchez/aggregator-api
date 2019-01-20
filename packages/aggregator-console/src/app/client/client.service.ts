import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '../common/storage.service';
import { ISSUER_URL, AGGREGATOR_SERVICE } from '../constants/storage';
import { AuthService } from '../common/auth.service';
import { switchMap, map } from 'rxjs/operators';

@Injectable()
export class ClientService {
  constructor(
    private readonly auth: AuthService,
    private readonly http: HttpClient,
    private storageService: StorageService,
  ) {}

  getClient(clientID: string): Observable<any> {
    const url = `${this.storageService.getInfo(
      ISSUER_URL,
    )}/client/v1/getClientId/${clientID}`;
    return this.http.get<any>(url, { headers: this.auth.headers }).pipe(
      switchMap(client => {
        const serviceURL = this.storageService.getServiceUrlByType(
          AGGREGATOR_SERVICE,
        );
        return this.http
          .get<any>(`${serviceURL}/registered-client/v1/get/${clientID}`, {
            headers: this.auth.headers,
          })
          .pipe(
            map(registeredClient => {
              client.webhookURL = registeredClient.webhookURL;
              return client;
            }),
          );
      }),
    );
  }

  verifyClient(clientURL: string) {
    const url = `${clientURL}/info`;
    return this.http.get<string>(url);
  }

  createClient(
    clientName: string,
    callbackURLs: string[],
    scopes: string[],
    isTrusted: boolean,
  ) {
    const url = `${this.storageService.getInfo(ISSUER_URL)}/client/v1/create`;
    const clientData = {
      name: clientName,
      redirectUris: callbackURLs,
      allowedScopes: scopes,
      isTrusted,
    };
    return this.http
      .post<any>(url, clientData, { headers: this.auth.headers })
      .pipe(
        switchMap(client => {
          const serviceURL = this.storageService.getServiceUrlByType(
            AGGREGATOR_SERVICE,
          );
          return this.http
            .post<any>(
              `${serviceURL}/client-registration/register/${client.clientId}`,
              undefined,
              { headers: this.auth.headers },
            )
            .pipe(
              map(registeredClient => {
                client.uuid = registeredClient.uuid;
                return client;
              }),
            );
        }),
      );
  }

  updateClient(
    clientId: string,
    clientName: string,
    tokenDeleteEndpoint: string,
    userDeleteEndpoint: string,
    callbackURLs: string[],
    scopes: string[],
    isTrusted: boolean,
  ) {
    const url = `${this.storageService.getInfo(
      ISSUER_URL,
    )}/client/v1/update/${clientId}`;
    return this.http.put(
      url,
      {
        name: clientName,
        tokenDeleteEndpoint,
        userDeleteEndpoint,
        redirectUris: callbackURLs,
        allowedScopes: scopes,
        isTrusted,
      },
      { headers: this.auth.headers },
    );
  }

  invokeSetup(clientURL: string, savedClient: any) {
    const payload = {
      appURL: clientURL,
      authServerURL: this.storageService.getInfo(ISSUER_URL),
      clientId: savedClient.clientId,
      clientSecret: savedClient.clientSecret,
      callbackURLs: savedClient.redirectUris,
    };
    const url = `${clientURL}/setup`;
    return this.http.post(url, payload);
  }

  getScopes() {
    const url = `${this.storageService.getInfo(ISSUER_URL)}/scope/v1/find`;
    return this.http.get<string>(url);
  }

  updateRegistration(clientId: string, payload: any) {
    const serviceURL = this.storageService.getServiceUrlByType(
      AGGREGATOR_SERVICE,
    );
    return this.http.put<any>(
      `${serviceURL}/registered-client/v1/update/${clientId}`,
      payload,
      { headers: this.auth.headers },
    );
  }
}
