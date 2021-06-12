import { IsNumber, IsString } from 'class-validator';

export class CreatePriceDto {
  @IsNumber()
  id: number;
}
