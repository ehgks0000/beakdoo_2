import {
  BeforeInsert,
  Column,
  CreateDateColumn,
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
  IsNumber,
} from 'class-validator';
import { Trade } from './Trade.entity';

@Entity({ name: 'prices' })
export class Price {
  // Columns
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'bigint' })
  @IsNumber()
  time!: number;
  //   @CreateDateColumn({ type: 'timestamp' })
  //   @IsNumber()
  //   time!: Date;

  @Column({ type: 'real' })
  //   @Column({ type: 'int' })
  @IsNumber()
  count!: number;

  //   @Column()
  @Column({ type: 'real' })
  @IsNumber()
  open!: number;

  //   @Column()
  @Column({ type: 'real' })
  @IsNumber()
  high!: number;

  //   @Column()
  @Column({ type: 'real' })
  @IsNumber()
  low!: number;

  //   @Column()
  @Column({ type: 'real' })
  @IsNumber()
  close!: number;

  //   @Column()
  @Column({ type: 'real' })
  @IsNumber()
  volume!: number;

  @Column({ type: 'real' })
  //   @Column()
  @IsNumber()
  vwap!: number;

  @OneToMany((type) => Trade, (trade) => trade.coin)
  trade: Trade[];

  //   @Column()
  //   @IsNumber()
  //   u: string;

  //   @Column()
  //   @IsNumber()
  //   d: string;

  //   @Column()
  //   @IsNumber()
  //   au: string;

  //   @Column()
  //   @IsNumber()
  //   ad: string;

  //   @BeforeInsert()
  //   getRSI() {
  //     //   this.u = this.
  //   }
  // Relations Ids

  // Relations
  //   @OneToMany((type) => ChannelChat, (chat) => chat.user, { cascade: true })
  //   chat: ChannelChat[];

  //   @OneToMany((type) => ChannelMember, (channel) => channel.user, {
  //     // cascade: true,
  //   })
  //   channel: ChannelMember[];

  //   @OneToMany((type) => Channel, (mychannel) => mychannel.host)
  //   mychannel: Channel[];
}
