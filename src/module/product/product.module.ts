import { Module } from '@nestjs/common';
import { ProductController } from './controllers/product.controller';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entites/product.entity';
import { ColorProductController } from './controllers/color-product.controller';
import { SizeProductController } from './controllers/size-product.controller';
import { DetailProductController } from './controllers/detail-product.controller';
@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  controllers: [
    ProductController,
    ColorProductController,
    SizeProductController,
    DetailProductController,
  ],
  providers: [ProductService],
})
export class ProductModule {}
