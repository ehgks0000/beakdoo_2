import { Injectable } from '@nestjs/common';
import { PriceRepository } from 'src/typeorm/repository/price.repository';
import { UserRepository } from 'src/typeorm/repository/user.repository';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly priceRepository: PriceRepository,
  ) {}

  async findAll() {
    const users = await this.userRepository.find();

    users.forEach((user) => delete user.password);
    return users;
  }

  async getMy() {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.trade', 'trade')
      .where('user.id = :id', { id: 1 })
      .orderBy('trade.id', 'DESC')
      .getOne();

    delete user.password;
    return user;
  }

  async getRoe(id: number) {
    const { open } = await this.priceRepository.findOne({ id });
    // coin.open
    console.log('현 시점 코인 가격:', open);
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.trade', 'trade')
      .leftJoinAndSelect('trade.coin', 'coin')
      .where('user.id = :id', { id: 1 })
      .getOne();
    delete user.password;
    delete user.trade;

    const profit = user.averagePrice - open;
    const profitRate = (profit / user.purchaseAmount) * 100;
    const totalHoldings = open * user.count + user.wallet;

    //손익과 수익률, 추정 총 자산
    user['profit'] = profit.toFixed(2) + ' $';
    user['profitRate'] = profitRate.toFixed(2) + ' %';
    user['totalHoldings'] = totalHoldings;

    return user;
  }
}
