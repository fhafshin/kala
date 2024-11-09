import { Module } from '@nestjs/common';
import { DiscountController } from './discount.controller';
import { DiscountService } from './discount.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiscountEntity } from './entity/discount.entity';
import { ProductService } from '../product/services/product.service';
import { ProductEntity } from '../product/entites/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DiscountEntity, ProductEntity])],
  controllers: [DiscountController],
  providers: [DiscountService, ProductService],
})
export class DiscountModule {}
