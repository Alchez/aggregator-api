import { IsUrl, IsOptional } from 'class-validator';

export class ClientRegistrationDto {
  @IsUrl()
  @IsOptional()
  webhookURL: string;
}
