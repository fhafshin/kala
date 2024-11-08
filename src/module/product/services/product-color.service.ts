import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { ProductEntity } from '../entites/product.entity';
import { isBoolean } from 'class-validator';
import { ProductColorEntity } from '../entites/product-color.entity';
import { AddColorDto, UpdateColorDto } from '../dto/color.dto';

@Injectable()
export class ProductColorService {
  constructor(
    @InjectRepository(ProductColorEntity)
    private colorRepository: Repository<ProductColorEntity>,
    private dataSource: DataSource,
  ) {}

  async findOne(id: number) {
    const color = await this.colorRepository.findOneBy({ id });
    if (!color) throw new NotFoundException('color of product is not found');
    return color;
  }
  async findAll() {
    const colors = await this.colorRepository.find();
    if (!colors) throw new NotFoundException('colors of products not found');
    return colors;
  }
  async createcolor(data: AddColorDto) {
    const {
      productId,
      color_code,
      color_name,
      active_discount,
      discount,
      price,
      count,
    } = data;
    const queryRunner = this.dataSource.createQueryRunner();

    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();
      const product = await queryRunner.manager.findOneBy(ProductEntity, {
        id: productId,
      });

      if (!product) throw new NotFoundException('product not found');

      await queryRunner.manager.insert(ProductColorEntity, {
        productId,
        color_code,
        color_name,
        active_discount,
        discount,
        price,
        count,
      });

      if (count > 0) {
        console.log(count);
        product.count = product.count + count;
        await queryRunner.manager.save(product);
      }

      await queryRunner.commitTransaction();
      await queryRunner.release();

      return { message: 'color of product created successfully' };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      throw error;
    }
  }

  async updatecolor(id: number, data: UpdateColorDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    const {
      count,
      color_code,
      color_name,
      active_discount,
      discount,
      productId,
      price,
    } = data;
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();
      const colorObj = await queryRunner.manager.findOneBy(ProductColorEntity, {
        id,
      });

      if (color_name && colorObj.color_name != color_name)
        colorObj.color_name = color_name;
      if (color_code && colorObj.color_code != color_code)
        colorObj.color_code = color_code;
      if (
        isBoolean(active_discount) &&
        colorObj.active_discount != active_discount
      )
        colorObj.active_discount = active_discount;

      if (discount && colorObj.discount != discount)
        colorObj.discount = discount;

      if (price && colorObj.price != price) colorObj.price = price;

      if (!isNaN(count)) {
        const product = await queryRunner.manager.findOneBy(ProductEntity, {
          id: productId,
        });
        if (!product) throw new NotFoundException('product not found');
        const _count = product.count - colorObj.count;
        console.log(_count + count);

        product.count = _count + count;
        colorObj.count = count;
        await queryRunner.manager.save(product);
      }
      await queryRunner.manager.save(colorObj);

      await queryRunner.commitTransaction();
      await queryRunner.release();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      throw error;
    }
  }
  async deletecolor(id: number) {
    const queryRunner = this.dataSource.createQueryRunner();
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();

      const color = await queryRunner.manager.findOneBy(ProductColorEntity, {
        id,
      });
      if (!color) throw new NotFoundException('color of prudoct is not found');

      const product = await queryRunner.manager.findOneBy(ProductEntity, {
        id: color.productId,
      });

      if (!product) throw new NotFoundException('product is not found');

      product.count = product.count - color.count;

      await queryRunner.manager.save(product);
      await queryRunner.manager.remove(color);

      await queryRunner.commitTransaction();
      await queryRunner.release();

      return { message: 'color of product is successfully deleted' };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      throw error;
    }
  }
}
