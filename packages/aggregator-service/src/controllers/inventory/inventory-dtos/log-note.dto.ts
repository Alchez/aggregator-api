import { IsNotEmpty } from 'class-validator';

export class LogNoteDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  content: string;
}
