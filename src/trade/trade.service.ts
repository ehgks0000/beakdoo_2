import { BadRequestException, Injectable } from '@nestjs/common';
import { PriceService } from 'src/price/price.service';
import { Trade } from 'src/typeorm/entity/Trade.entity';
import { PriceRepository } from '../typeorm/repository/price.repository';
import { TradeRepository } from '../typeorm/repository/trade.repository';
import { UserRepository } from '../typeorm/repository/user.repository';
import { CreateTradeDto } from './dto/create-trade.dto';

@Injectable()
export class TradeService {
  constructor(
    private readonly tradeRepository: TradeRepository,
    private readonly userRepository: UserRepository,
    private readonly priceRepository: PriceRepository,
    private readonly priceService: PriceService,
  ) {}
  async buyCoin(data: CreateTradeDto) {
    const { id, count } = data;

    //가장 최신 거래 가져오기
    const trade = await this.tradeRepository
      .createQueryBuilder('trade')
      .leftJoinAndSelect('trade.user', 'user')
      .leftJoinAndSelect('trade.coin', 'coin')
      .where('user.id = :id', { id: 1 })
      .orderBy('trade.id', 'DESC')
      .limit(1)
      .getOne();

    //지난 시점 매수 시 오류발생
    if (id < trade.coin.id)
      return new BadRequestException('이미 지난 시점입니다.');

    const getRsi = await this.priceService.getRsi(id);
    // const getRsi = await this.priceService.getRsi({ id });

    if (getRsi['rsi'] > 30) {
      console.log('rsi', getRsi['rsi']);

      return new BadRequestException('rsi 30이상, 매수 권고하지 않음');
    }

    const coin = await this.priceRepository.findOne({ id: id });
    const user = await this.userRepository.findOne({ id: 1 });
    const orderPrice = coin.open * count;
    // const orderPrice = parseInt(coin.open) * count;
    if (orderPrice > user.wallet) {
      new BadRequestException('주문한 코인의 가격이 소유한 돈보다 많습니다.');
    }
    const newTrade = new Trade();
    newTrade.count = count;
    newTrade.user = user;
    newTrade.coin = coin;
    newTrade.type = 'BUY';

    user.wallet = user.wallet - orderPrice;

    const preCount = user.count;
    user.count += count;

    user.averagePrice =
      (user.averagePrice * preCount + orderPrice) / user.count;

    user.purchaseAmount = user.count * user.averagePrice;

    await this.tradeRepository.save(newTrade);
    await this.userRepository.save(user);

    delete newTrade.user.password;

    return newTrade;
  }

  async sellCoin(data: CreateTradeDto) {
    const { id, count } = data;

    //가장 최신 거래 가져오기
    const trade = await this.tradeRepository
      .createQueryBuilder('trade')
      .leftJoinAndSelect('trade.user', 'user')
      .leftJoinAndSelect('trade.coin', 'coin')
      .where('user.id = :id', { id: 1 })
      .orderBy('trade.id', 'DESC')
      .limit(1)
      .getOne();

    //지난 시점 매도 시 오류발생
    if (id < trade.coin.id)
      return new BadRequestException('이미 지난 시점입니다.');

    const getRsi = await this.priceService.getRsi(id);
    // const getRsi = await this.priceService.getRsi({ id });

    if (getRsi['rsi'] < 70) {
      console.log('rsi', getRsi['rsi']);
      return new BadRequestException('rsi 70이하, 매도 권고하지 않음');
    }

    const coin = await this.priceRepository.findOne({ id: id });
    const user = await this.userRepository.findOne({ id: 1 });
    if (count > user.count) {
      return new BadRequestException(
        '갖고 있는 수량보다 많은 것을 팔수 없습니다.',
      );
    }
    const orderPrice = coin.open * count;
    // const orderPrice = parseInt(coin.open) * count;

    // if (orderPrice > user.money) {
    //   new BadRequestException('주문한 코인의 가격이 소유한 돈보다 많습니다.');
    // }
    const newTrade = new Trade();
    newTrade.count = count;
    newTrade.user = user;
    newTrade.coin = coin;
    newTrade.type = 'SELL';

    user.wallet = user.wallet + orderPrice;
    user.count -= count;
    user.purchaseAmount = user.count * user.averagePrice;

    this.tradeRepository.save(newTrade);
    this.userRepository.save(user);

    delete newTrade.user.password;

    return newTrade;
  }

  async findAll() {
    const trades = await this.tradeRepository
      .createQueryBuilder('trade')
      .leftJoinAndSelect('trade.coin', 'coin')
      .orderBy('coin.time', 'DESC')
      .getMany();

    // trades.forEach;

    // trades.forEach((trade) => {
    //   const unixDate = trade.coin.time / 1;
    //   console.log(unixDate);
    //   const date = new Date(unixDate);
    //   console.log(date);
    // });
    return trades;
  }
}
