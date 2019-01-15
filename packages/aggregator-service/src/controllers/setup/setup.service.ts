import { Injectable, HttpService } from '@nestjs/common';
import { SettingsService } from '../../models/settings/settings.service';
import { PLEASE_RUN_SETUP } from '../../constants/messages';

@Injectable()
export class SetupService {
  constructor(
    private readonly http: HttpService,
    private readonly settingsService: SettingsService,
  ) {}

  async setup(params) {
    this.http
      .get(params.authServerURL + '/.well-known/openid-configuration')
      .subscribe({
        next: async response => {
          params.authorizationURL = response.data.authorization_endpoint;
          params.tokenURL = response.data.token_endpoint;
          params.profileURL = response.data.userinfo_endpoint;
          params.revocationURL = response.data.revocation_endpoint;
          params.introspectionURL = response.data.introspection_endpoint;
          params.callbackURLs = [
            params.appURL + '/index.html',
            params.appURL + '/silent-refresh.html',
          ];
          return await this.settingsService.save(params);
        },
        error: error => {
          // TODO : Log Error
        },
      });
  }

  async getInfo() {
    const info: any = await this.settingsService.findOne({});
    if (info) {
      delete info.clientSecret, info._id;
      const services = await this.settingsService.findAll();
      info.services = services.map(service => {
        return {
          url: service.appURL,
          type: service.type,
        };
      });
      return info;
    } else {
      return { message: PLEASE_RUN_SETUP };
    }
  }
}
