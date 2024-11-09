import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BasketEntity } from './entity/basket.entity';
import { BasketController } from './basket.controller';
import { BasketService } from './basket.service';
import { ProductService } from '../product/services/product.service';
import { ProductModule } from '../product/product.module';
import { ProductEntity } from '../product/entites/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BasketEntity]), ProductModule],
  controllers: [BasketController],
  providers: [BasketService],
})
export class BasketModule {}
