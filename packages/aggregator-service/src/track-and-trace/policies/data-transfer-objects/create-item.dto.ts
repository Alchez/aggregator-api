import { IsString } from 'class-validator';

export class CreateItemDto {
  @IsString()
  itemName: string;

  @IsString()
  itemCategory: string;

  @IsString()
  unitOfMeasure: string;

  @IsString()
  strain: string;
}
