import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ISSUER_URL } from '../constants/storage';
import { OAuthService } from 'angular-oauth2-oidc';
import { OpenIDConfiguration } from '../interfaces/open-id-configuration.interface';
import { StorageService } from '../common/storage.service';
import { switchMap } from 'rxjs/operators';
import { SettingsResponse } from './settings-response.interface';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  headers: HttpHeaders;
  constructor(
    private http: HttpClient,
    private oauthService: OAuthService,
    private storage: StorageService,
  ) {
    this.headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.oauthService.getAccessToken(),
    });
  }

  getClientSettings(serviceType: string) {
    const url =
      this.storage.getServiceUrlByType(serviceType) + '/settings/v1/get';
    return this.http.get<SettingsResponse>(url, { headers: this.headers });
  }

  updateSettings(
    serviceType: string,
    appURL: string,
    clientId: string,
    clientSecret: string,
  ) {
    const requestUrl =
      this.storage.getServiceUrlByType(serviceType) + '/settings/v1/update';
    const authServerURL = localStorage.getItem(ISSUER_URL);
    return this.http
      .get(authServerURL + '/.well-known/openid-configuration')
      .pipe(
        switchMap((openidConfig: OpenIDConfiguration) => {
          return this.http.post(
            requestUrl,
            {
              appURL,
              authServerURL,
              clientId,
              clientSecret,
              authorizationURL: openidConfig.authorization_endpoint,
              callbackURLs: [
                appURL + '/index.html',
                appURL + '/silent-refresh.html',
              ],
              introspectionURL: openidConfig.introspection_endpoint,
              profileURL: openidConfig.userinfo_endpoint,
              revocationURL: openidConfig.revocation_endpoint,
              tokenURL: openidConfig.token_endpoint,
            },
            { headers: this.headers },
          );
        }),
      );
  }
}
