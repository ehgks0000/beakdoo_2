import {
  Column,
  Entity,
  ManyToOne,
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
import { User } from 'src/typeorm/entity/User.entity';
import { Price } from './Price.entity';

@Entity({ name: 'trades' })
export class Trade {
  // Columns
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'real' })
  count: number;

  @Column()
  type: string;

  //   @Column()
  //   price: number;

  // Relations Ids

  // Relations
  @ManyToOne((type) => User, (user) => user.trade)
  user: User;

  @ManyToOne((type) => Price, (coin) => coin.trade)
  coin: Price;

  //   @OneToMany((type) => ChannelMember, (channel) => channel.user, {
  //     // cascade: true,
  //   })
  //   channel: ChannelMember[];

  //   @OneToMany((type) => Channel, (mychannel) => mychannel.host)
  //   mychannel: Channel[];
}
