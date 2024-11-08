import { Module } from '@nestjs/common';
import { ProductController } from './controllers/product.controller';
import { ProductService } from './services/product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entites/product.entity';
import { ColorProductController } from './controllers/color-product.controller';
import { SizeProductController } from './controllers/size-product.controller';
import { DetailProductController } from './controllers/detail-product.controller';
import { ProductSizeService } from './services/product-size.service';
import { ProductColorService } from './services/product-color.service';
import { ProductDetailService } from './services/product-detail.service';
import { ProductSizeEntity } from './entites/product-size.entity';
import { ProductColorEntity } from './entites/product-color.entity';
import { ProductDetailEntity } from './entites/product-detail.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductEntity,
      ProductSizeEntity,
      ProductColorEntity,
      ProductDetailEntity,
    ]),
  ],
  controllers: [
    ProductController,
    ColorProductController,
    SizeProductController,
    DetailProductController,
  ],
  providers: [
    ProductService,
    ProductSizeService,
    ProductColorService,
    ProductDetailService,
  ],
})
export class ProductModule {}
