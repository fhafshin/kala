import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from '../entites/product.entity';
import { DeepPartial, Repository } from 'typeorm';
import { CreateProductDto, UpdateProductDto } from '../dto/product.dto';
import { ApiTags } from '@nestjs/swagger';
import { ProductType } from '../enum/type.enum';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
  ) {}

  async createProduct(data: CreateProductDto) {
    const {
      title,
      slug,
      active_discount,
      discount,
      count,
      code,
      content,
      price,
      type,
    } = data;
    const productObject: DeepPartial<ProductEntity> = {
      title,
      content,
      slug,
      code,
      discount,
      active_discount,
    };
    if (type === ProductType.Single) {
      Object.assign(productObject, { type, count, price });
    } else if (
      [ProductType.Coloring, ProductType.Sizing].includes(type as any)
    ) {
      productObject['type'] = type;
    } else {
      throw new BadRequestException('type product invalid');
    }

    await this.productRepository.save(productObject);
    return {
      message: 'created product successfully',
    };
  }

  async findAll() {
    return this.productRepository.find({
      where: {},
      relations: { colors: true, details: true, sizes: true },
    });
  }

  async update(id: number, data: UpdateProductDto) {
    const product = await this.findOneLean(id);
    const {
      active_discount,
      discount,
      count,
      price,
      type,
      content,
      slug,
      code,
      title,
    } = data;

    if (title && title != product.title) product.title = title;
    if (slug && slug != product.slug) product.slug = slug;
    if (content && content != product.content) product.content = content;
    if (discount && discount != product.discount) product.discount = discount;
    if (active_discount && active_discount != product.active_discount)
      product.active_discount = active_discount;
    if (code && code != product.code) product.code = code;
    if (type === ProductType.Single) Object.assign(product, { price, count });

    await this.productRepository.save(product);
    return { message: 'updated suscessfully product' };
  }
  async delete(id: number) {
    await this.findOne(id);
    await this.productRepository.delete({ id });
    return { message: 'deleted product successfully' };
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: { colors: true, sizes: true, details: true },
    });
    if (!product) throw new NotFoundException('product is not found...');
    return product;
  }

  async findOneLean(id: number) {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) throw new NotFoundException('product is not found...');
    return product;
  }
}
