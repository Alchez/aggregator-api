import { IsUrl, IsNotEmpty } from 'class-validator';

export class ServerSettingsDto {
  uuid?: string;

  @IsUrl()
  appURL: string;

  @IsUrl()
  authServerURL: string;

  @IsNotEmpty()
  clientId: string;

  @IsNotEmpty()
  clientSecret: string;

  @IsUrl({ allow_underscores: true }, { each: true })
  callbackURLs: string[];
}
