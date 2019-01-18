import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '../common/storage.service';
import { ISSUER_URL } from '../constants/storage';

@Injectable()
export class ClientService {
  constructor(
    private readonly http: HttpClient,
    private storageService: StorageService,
  ) {}

  getClient(clientID: string): Observable<any> {
    const url = `${this.storageService.getInfo(
      ISSUER_URL,
    )}/client/v1/get/${clientID}`;
    return this.http.get<string>(url);
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
    return this.http.post(url, clientData);
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
    return this.http.put(url, {
      name: clientName,
      tokenDeleteEndpoint,
      userDeleteEndpoint,
      redirectUris: callbackURLs,
      allowedScopes: scopes,
      isTrusted,
    });
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
}
