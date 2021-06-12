import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import {
  IsString,
  IsOptional,
  IsEnum,
  IsEmail,
  IsUrl,
  IsBoolean,
} from 'class-validator';
import { Trade } from './Trade.entity';

@Entity({ name: 'users' })
export class User {
  // Columns
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsEmail()
  email!: string;

  @Column()
  @IsString()
  password?: string;

  //현금
  @Column({ type: 'real', default: 10000 })
  wallet?: number;

  //총 매입금액
  @Column({ type: 'real', default: 0 })
  purchaseAmount?: number;

  //총 매수 수량
  @Column({ type: 'real', default: 0 })
  count?: number;

  //매수 평균가
  @Column({ type: 'real', default: 0 })
  averagePrice?: number;

  // Relations Ids

  // Relations
  @OneToMany((type) => Trade, (trade) => trade.user)
  trade: Trade[];

  //   @OneToMany((type) => ChannelMember, (channel) => channel.user, {
  //     // cascade: true,
  //   })
  //   channel: ChannelMember[];

  //   @OneToMany((type) => Channel, (mychannel) => mychannel.host)
  //   mychannel: Channel[];
}
