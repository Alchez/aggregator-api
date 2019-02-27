import { IsUrl, IsString } from 'class-validator';

export class UpdateClientDTO {
  @IsUrl()
  webhookURL: string;

  @IsString()
  userKey: string;

  @IsString()
  licenseNumber: string;
}
