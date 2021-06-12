import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PriceService } from './price.service';
import { CreatePriceDto } from './dto/create-price.dto';

@Controller('price')
export class PriceController {
  constructor(private readonly priceService: PriceService) {}

  //전체 가격보기
  @Get()
  findAll() {
    return this.priceService.findAll();
  }
  //db안 데이터 전체 rsi 구하기
  @Get('rsis')
  getRsis() {
    // console.log('asdfasdfasdf');
    return this.priceService.getRsis();
  }

  //특정 시점 가격보기
  @Get(':id')
  getPrice(@Param('id') id: number) {
    return this.priceService.getPrice(id);
  }
  //특정 시점 rsi 보기
  @Post(':id')
  getRsi(@Param('id') id: number) {
    //   getRsi(@Body() data: CreatePriceDto) {
    return this.priceService.getRsi(id);
    // return this.priceService.getRsi(data);
  }
}
