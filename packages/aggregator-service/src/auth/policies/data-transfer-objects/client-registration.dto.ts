import { IsUrl, IsOptional, IsString } from 'class-validator';

export class ClientRegistrationDto {
  @IsUrl()
  @IsOptional()
  webhookURL: string;

  @IsString()
  userKey: string;

  @IsString()
  licenseNumber: string;
}
