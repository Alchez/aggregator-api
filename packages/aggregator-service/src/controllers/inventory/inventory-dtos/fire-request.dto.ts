import { IsNotEmpty } from 'class-validator';

export class FireRequestDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  content: string;
}
