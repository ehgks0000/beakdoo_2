import { IsNumber } from 'class-validator';

export class CreateTradeDto {
  //price 테이블의 id값, 시간순서
  @IsNumber()
  id: number;

  @IsNumber()
  count: number;
}
