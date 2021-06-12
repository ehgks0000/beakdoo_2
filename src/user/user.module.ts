import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/typeorm/repository/user.repository';
import { PriceRepository } from 'src/typeorm/repository/price.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      //   TradeRepository,
      UserRepository,
      PriceRepository,
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
