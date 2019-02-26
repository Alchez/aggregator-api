import { IsUrl, IsString, IsOptional } from 'class-validator';

export class UpdateClientDTO {
  @IsUrl()
  @IsOptional()
  webhookURL: string;

  @IsString()
  @IsOptional()
  clientId: string;

  @IsString()
  @IsOptional()
  clientSecret: string;

  @IsString()
  @IsOptional()
  userKey: string;

  @IsString()
  @IsOptional()
  licenseNumber: string;
}
