import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TradeService } from './trade.service';
import { CreateTradeDto } from './dto/create-trade.dto';

@Controller('trade')
export class TradeController {
  constructor(private readonly tradeService: TradeService) {}

  //거래하기
  @Post('/buy')
  buyCoin(@Body() data: CreateTradeDto) {
    return this.tradeService.buyCoin(data);
  }
  @Post('/sell')
  sellCoin(@Body() data: CreateTradeDto) {
    return this.tradeService.sellCoin(data);
  }

  //전체 거래내역
  @Get()
  findAll() {
    return this.tradeService.findAll();
  }
}
