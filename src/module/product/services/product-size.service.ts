import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductSizeEntity } from '../entites/product-size.entity';
import { DataSource, Repository } from 'typeorm';
import { AddSizeDto, UpdateSizeDto } from '../dto/size.dto';
import { ProductEntity } from '../entites/product.entity';
import { isBoolean } from 'class-validator';

@Injectable()
export class ProductSizeService {
  constructor(
    @InjectRepository(ProductSizeEntity)
    private sizeRepository: Repository<ProductSizeEntity>,
    private dataSource: DataSource,
  ) {}

  async findOne(id: number) {
    const size = await this.sizeRepository.findOneBy({ id });
    if (!size) throw new NotFoundException('size of product is not found');
    return size;
  }
  async findAll() {
    const sizes = await this.sizeRepository.find();
    if (!sizes) throw new NotFoundException('sizes of products not found');
    return sizes;
  }
  async createSize(data: AddSizeDto) {
    const { productId, size, active_discount, discount, price, count } = data;
    const queryRunner = this.dataSource.createQueryRunner();

    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();
      const product = await queryRunner.manager.findOneBy(ProductEntity, {
        id: productId,
      });

      if (!product) throw new NotFoundException('product not found');

      await queryRunner.manager.insert(ProductSizeEntity, {
        productId,
        size,
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

      return { message: 'size of product created successfully' };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      throw error;
    }
  }

  async updateSize(id: number, data: UpdateSizeDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    const { count, size, active_discount, discount, productId, price } = data;
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();
      const sizeObj = await queryRunner.manager.findOneBy(ProductSizeEntity, {
        id,
      });

      if (size && sizeObj.size != size) sizeObj.size = size;
      if (
        isBoolean(active_discount) &&
        sizeObj.active_discount != active_discount
      )
        sizeObj.active_discount = active_discount;

      if (discount && sizeObj.discount != discount) sizeObj.discount = discount;

      if (price && sizeObj.price != price) sizeObj.price = price;

      if (!isNaN(count)) {
        const product = await queryRunner.manager.findOneBy(ProductEntity, {
          id: productId,
        });
        if (!product) throw new NotFoundException('product not found');
        const _count = product.count - sizeObj.count;
        console.log(_count + count);

        product.count = _count + count;
        sizeObj.count = count;
        await queryRunner.manager.save(product);
      }
      await queryRunner.manager.save(sizeObj);

      await queryRunner.commitTransaction();
      await queryRunner.release();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      throw error;
    }
  }
  async deleteSize(id: number) {
    const queryRunner = this.dataSource.createQueryRunner();
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();

      const size = await queryRunner.manager.findOneBy(ProductSizeEntity, {
        id,
      });
      if (!size) throw new NotFoundException('size of prudoct is not found');

      const product = await queryRunner.manager.findOneBy(ProductEntity, {
        id: size.productId,
      });

      if (!product) throw new NotFoundException('product is not found');

      product.count = product.count - size.count;

      await queryRunner.manager.save(product);
      await queryRunner.manager.remove(size);

      await queryRunner.commitTransaction();
      await queryRunner.release();

      return { message: 'size of product is successfully deleted' };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      throw error;
    }
  }
}
