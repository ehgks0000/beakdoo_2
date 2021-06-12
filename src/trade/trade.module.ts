import { Module } from '@nestjs/common';
import { TradeService } from './trade.service';
import { TradeController } from './trade.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TradeRepository } from 'src/typeorm/repository/trade.repository';
import { UserRepository } from 'src/typeorm/repository/user.repository';
import { PriceRepository } from 'src/typeorm/repository/price.repository';
import { PriceService } from 'src/price/price.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TradeRepository,
      UserRepository,
      PriceRepository,
    ]),
  ],
  controllers: [TradeController],
  providers: [TradeService, PriceService],
})
export class TradeModule {}
