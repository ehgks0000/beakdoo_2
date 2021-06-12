import { BadRequestException, ConflictException } from '@nestjs/common';

import {
  EntityRepository,
  getConnection,
  getRepository,
  Repository,
} from 'typeorm';
import { Trade } from '../entity/Trade.entity';

@EntityRepository(Trade)
export class TradeRepository extends Repository<Trade> {
  //   async createUser(data: CreateUserDto): Promise<User> {}
}
