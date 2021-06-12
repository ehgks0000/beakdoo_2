import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { entities } from '../typeorm/index';
// const inContainer = JSON.parse(process.env.IN_CONTAINER);

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: true,
  logging: true,
  entities,
};
