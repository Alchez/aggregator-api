import { IsUrl } from 'class-validator';

export class ClientRegistrationDto {
  @IsUrl()
  webhookURL: string;
}
