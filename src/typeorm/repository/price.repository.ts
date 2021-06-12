import { BadRequestException, ConflictException } from '@nestjs/common';

import {
  EntityRepository,
  getConnection,
  getRepository,
  Repository,
} from 'typeorm';
import { Price } from '../entity/Price.entity';

@EntityRepository(Price)
export class PriceRepository extends Repository<Price> {
  //   async createUser(data: CreateUserDto): Promise<User> {}
}
