import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotImplementedException,
  HttpService,
} from '@nestjs/common';
import { SettingsService } from '../models/settings/settings.service';
import { TokenCacheService } from '../models/token-cache/token-cache.service';
import { TOKEN, AUTHORIZATION, CONTENT_TYPE } from './../constants/app-strings';
import { switchMap, retry, catchError } from 'rxjs/operators';
import { of, from } from 'rxjs';
import * as Express from 'express';
import { stringify } from 'querystring';

@Injectable()
export class TokenGuard implements CanActivate {
  constructor(
    private readonly settingsService: SettingsService,
    private readonly tokenCacheService: TokenCacheService,
    private readonly http: HttpService,
  ) {}
  canActivate(context: ExecutionContext) {
    const httpContext = context.switchToHttp();
    const req = httpContext.getRequest();
    const accessToken = this.getAccessToken(req);
    return from(this.tokenCacheService.findOne({ accessToken })).pipe(
      switchMap(cachedToken => {
        if (!cachedToken) {
          return this.introspectToken(accessToken, req);
        } else if (new Date().getTime() < cachedToken.exp) {
          req[TOKEN] = cachedToken;
          return of(true);
        } else {
          from(
            this.tokenCacheService.deleteMany({
              accessToken: cachedToken.accessToken,
            }),
          ).subscribe();
          return this.introspectToken(accessToken, req);
        }
      }),
    );
  }

  introspectToken(accessToken: string, req: Express.Request) {
    return from(this.settingsService.findOne({})).pipe(
      switchMap(settings => {
        if (!settings) throw new NotImplementedException();
        const baseEncodedCred = Buffer.from(
          settings.clientId + ':' + settings.clientSecret,
        ).toString('base64');

        const headers = {};
        headers[AUTHORIZATION] = 'Basic ' + baseEncodedCred;
        headers[CONTENT_TYPE] = 'application/x-www-form-urlencoded';

        return this.http
          .post(settings.introspectionURL, stringify({ token: accessToken }), {
            headers,
          })
          .pipe(retry(3));
      }),
      switchMap(response => from(this.cacheToken(response.data, accessToken))),
      switchMap(cachedToken => {
        req[TOKEN] = cachedToken;
        return of(cachedToken.active);
      }),
      catchError(error => of(false)),
    );
  }

  getAccessToken(request) {
    if (!request.headers.authorization) {
      if (!request.query.access_token) return null;
    }
    return (
      request.query.access_token ||
      request.headers.authorization.split(' ')[1] ||
      null
    );
  }

  cacheToken(introspectedToken: any, accessToken: string) {
    introspectedToken.accessToken = accessToken;
    introspectedToken.clientId = introspectedToken.client_id;
    return this.tokenCacheService.save(introspectedToken);
  }
}
