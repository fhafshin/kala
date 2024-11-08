import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductDetailEntity } from '../entites/product-detail.entity';
import { Repository } from 'typeorm';
import { ProductSizeService } from './product-size.service';
import { ProductService } from './product.service';
import { AddDetailDto, UpdateDetailDto } from '../dto/detail.dto';

@Injectable()
export class ProductDetailService {
  constructor(
    @InjectRepository(ProductDetailEntity)
    private detailRepository: Repository<ProductDetailEntity>,
    private productService: ProductService,
  ) {}

  async findOne(id: number) {
    const detail = await this.detailRepository.findOneBy({ id });
    if (!detail) throw new NotFoundException('not found deatil of product');
    return detail;
  }
  async findAll() {
    const details = await this.detailRepository.find({});
    if (!details) throw new NotFoundException('not found details of products');
    return details;
  }
  async createDetail(data: AddDetailDto) {
    const { key, productId, value } = data;
    await this.detailRepository.insert({ key, productId, value });
    return { message: 'detail of product created successfully' };
  }
  async updateDetail(id: number, data: UpdateDetailDto) {
    const detail = await this.findOne(id);
    const { key, productId, value } = data;
    if (productId) {
      if (key && key != detail.key) detail.key = key;
      if (value && value != detail.value) detail.value = value;
      await this.detailRepository.save(detail);
      return { message: 'update detail of product successfully' };
    }
    throw new BadRequestException(
      'productId is not found in update detail of product',
    );
  }
  async deleteDetail(id: number) {
    await this.findOne(id);
    await this.detailRepository.delete({ id });
    return { message: 'delete detail of product successfully' };
  }
}
