import { Injectable, HttpService, SerializeOptions } from '@nestjs/common';
import { switchMap } from 'rxjs/operators';
import { SettingsService } from '../../entities/settings/settings.service';
import { PLEASE_RUN_SETUP } from '../../../constants/messages';

@Injectable()
@SerializeOptions({ excludePrefixes: ['_', 'clientSecret'] })
export class SetupService {
  constructor(
    private readonly http: HttpService,
    private readonly settingsService: SettingsService,
  ) {}

  setup(params) {
    return this.http
      .get(params.authServerURL + '/.well-known/openid-configuration')
      .pipe(
        switchMap(response => {
          params.authorizationURL = response.data.authorization_endpoint;
          params.tokenURL = response.data.token_endpoint;
          params.profileURL = response.data.userinfo_endpoint;
          params.revocationURL = response.data.revocation_endpoint;
          params.introspectionURL = response.data.introspection_endpoint;
          params.callbackURLs = [
            params.appURL + '/index.html',
            params.appURL + '/silent-refresh.html',
          ];
          return this.settingsService.save(params);
        }),
      );
  }

  async getInfo() {
    const info = await this.settingsService.findOne({});
    if (info) {
      // Remove client secret from public endpoint
      info.set('clientSecret', undefined);
      return info;
    } else {
      return { message: PLEASE_RUN_SETUP };
    }
  }
}
