import { User } from 'src/typeorm/entity/User.entity';
import { Trade } from './entity/Trade.entity';
import { Price } from './entity/Price.entity';

export const entities = [User, Trade, Price];
