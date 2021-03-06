import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { AUTHORIZATION } from '../../constants/app-strings';
import { SettingsService } from '../../system-settings/entities/settings/settings.service';

@Injectable()
export class AuthServerVerificationGuard implements CanActivate {
  constructor(private readonly settingsService: SettingsService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();
    // TODO: verify raw data with client secret and following header
    if (
      request.headers[AUTHORIZATION] &&
      (await this.verifyAuthorization(request.headers[AUTHORIZATION]))
    ) {
      return true;
    }
    return false;
  }

  async verifyAuthorization(authorizationHeader): Promise<boolean> {
    try {
      const basicAuthHeader = authorizationHeader.split(' ')[1];
      const [clientId, clientSecret] = Buffer.from(basicAuthHeader, 'base64')
        .toString()
        .split(':');
      const settings = await this.settingsService.findOne({});
      if (
        settings &&
        (settings.clientId && settings.clientId === clientId) &&
        settings.clientSecret === clientSecret
      ) {
        return true;
      }
    } catch (error) {
      new ForbiddenException();
    }
    return false;
  }
}
