import { BadRequestException, ConflictException } from '@nestjs/common';

import {
  EntityRepository,
  getConnection,
  getRepository,
  Repository,
} from 'typeorm';

import { User } from 'src/typeorm/entity/User.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  //   async createUser(data: CreateUserDto): Promise<User> {}
}
