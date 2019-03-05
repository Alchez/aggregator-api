import { IsUrl, IsString } from 'class-validator';

export class ClientRegistrationDto {
  @IsUrl()
  webhookURL: string;

  @IsString()
  userKey: string;

  @IsString()
  licenseNumber: string;
}
