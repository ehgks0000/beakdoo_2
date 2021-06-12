import { Module } from '@nestjs/common';
import { PriceService } from './price.service';
import { PriceController } from './price.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PriceRepository } from 'src/typeorm/repository/price.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PriceRepository])],
  controllers: [PriceController],
  providers: [PriceService],
  exports: [PriceService],
})
export class PriceModule {}
