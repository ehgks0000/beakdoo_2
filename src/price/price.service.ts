import { BadRequestException, Injectable } from '@nestjs/common';
import { PriceRepository } from 'src/typeorm/repository/price.repository';
import { CreatePriceDto } from './dto/create-price.dto';

@Injectable()
export class PriceService {
  constructor(private readonly priceRepository: PriceRepository) {}

  async findAll() {
    const prices = await this.priceRepository.find();
    return prices;
  }
  async getPrice(id: number) {
    // const { id } = data;
    const prices = await this.priceRepository.findOne({ id: id });
    return prices;
  }

  //rsi 구하기
  async getRsi(id: number) {
    //   async getRsi(data: CreatePriceDto) {
    // const { id } = data;

    const id14 = id - 14;
    if (id14 < 0) return new BadRequestException('14이상으로 하세요');

    const prices = await this.priceRepository
      .createQueryBuilder('price')
      .where('price.id >= :id', { id: id14 })
      .take(15)
      .getMany();
    const close = [];
    prices.forEach((price) => {
      close.push(price.close);
      //   close.push(parseInt(price.close));
    });

    const originalPrice = prices[prices.length - 1];

    let AU = 0;
    let AD = 0;
    for (let i = 1; i < 15; i++) {
      const sub = close[i] - close[i - 1];
      if (sub > 0) {
        AU += sub / 14;
      } else {
        AD += -sub / 14;
      }
    }
    const rsi = (AU / (AU + AD)) * 100;
    // const rsi = (AU / 14 / (AU / 14 + AD / 14)) * 100;
    const msg = rsi > 70 ? '매도 시그널' : rsi < 30 ? '매수 시그널' : '대기';
    console.log(rsi);
    return { rsi };
    // return { originalPrice, rsi, msg };
  }

  async getRsis() {
    const prices = await this.priceRepository.find();

    // for (let i = 14; i < 16; i++) {
    for (let i = 14; i < prices.length; i++) {
      //   const close = prices[14].close;
      const close = [];
      for (let j = i - 14; j < i + 1; j++) {
        close.push(prices[j].close);
      }

      let AU = 0;
      let AD = 0;
      for (let i = 1; i < 15; i++) {
        const sub = close[i] - close[i - 1];
        if (sub > 0) {
          AU += sub / 14;
        } else {
          AD += -sub / 14;
        }
      }
      //   rsi.push((AU / (AU + AD)) * 100);
      prices[i]['rsi'] = (AU / (AU + AD)) * 100;
    }
    // return rsi;
    return prices;
  }
}
