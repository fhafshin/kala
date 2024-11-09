import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BasketEntity } from './entity/basket.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { AddToBasketDto } from './dto/basket.dto';
import { ProductService } from '../product/services/product.service';
import { Type } from '../discount/enum/type.enum';
import { ProductType } from '../product/enum/type.enum';
import { ProductEntity } from '../product/entites/product.entity';
import { ProductColorEntity } from '../product/entites/product-color.entity';
import { ProductSizeEntity } from '../product/entites/product-size.entity';
import { ProductColorService } from '../product/services/product-color.service';
import { ProductSizeService } from '../product/services/product-size.service';

@Injectable()
export class BasketService {
  constructor(
    @InjectRepository(BasketEntity)
    private basketRepository: Repository<BasketEntity>,
    private productService: ProductService,
    private productColorService: ProductColorService,
    private productSizrService: ProductSizeService,
  ) {}

  async addToBasket(data: AddToBasketDto) {
    const { productId, sizeId, colorId } = data;
    let where: FindOptionsWhere<BasketEntity>;

    const product = await this.productService.findOneLean(productId);
    where['productId'] = productId;
    let color: ProductColorEntity;
    let size: ProductSizeEntity;

    if (product.type == ProductType.Coloring && !colorId) {
      throw new BadRequestException('you should select some color');
    } else if (product.type == ProductType.Coloring && colorId) {
      color = await this.productColorService.findOne(colorId);
      where['colorId'] = colorId;
    } else if (product.type == ProductType.Sizing && !sizeId) {
      throw new BadRequestException('you should select some size');
    } else if (product.type == ProductType.Coloring && sizeId) {
      size = await this.productSizrService.findOne(sizeId);
      where['sizeId'] = sizeId;
    }

    let basket = await this.basketRepository.findOneBy(where);
    if (basket) {
      basket.count += 1;
    } else {
      basket = this.basketRepository.create({
        productId,
        colorId: color?.id ?? null,
        sizeId: size?.id ?? null,
        count: 1,
      });

      basket = await this.basketRepository.save(basket);
      return { message: 'basket created successfully' };
    }
  }
}
