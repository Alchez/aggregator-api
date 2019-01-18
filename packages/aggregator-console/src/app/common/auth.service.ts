import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public headers: HttpHeaders;

  constructor(private readonly oauthService: OAuthService) {
    this.headers = this.getHeaders();
  }

  getHeaders() {
    const auth = 'Authorization';
    const contentType = 'Content-Type';
    const headers = {};
    headers[auth] = 'Bearer ' + this.oauthService.getAccessToken();
    headers[contentType] = 'application/json';
    return new HttpHeaders(headers);
  }
}
