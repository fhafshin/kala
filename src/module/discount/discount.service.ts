import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DiscountEntity } from './entity/discount.entity';
import { DeepPartial, Repository } from 'typeorm';
import { CreateDiscountDto, UpdateDiscountDto } from './dto/discount.dto';
import { Type } from './enum/type.enum';
import { ProductService } from '../product/services/product.service';

@Injectable()
export class DiscountService {
  constructor(
    @InjectRepository(DiscountEntity)
    private discountRepository: Repository<DiscountEntity>,
    private productService: ProductService,
  ) {}

  async createDiscount(data: CreateDiscountDto) {
    const { amount, expire_in, percent, type, limit, code, productId } = data;

    let discountObject: DeepPartial<DiscountEntity> = {};
    if (type === Type.Product) {
      const product = await this.productService.findOne(productId);
      discountObject['type'] = 'product';
      discountObject['productId'] = productId;
    } else {
      discountObject['type'] = 'basket';
    }

    if ((percent && amount) || (!amount && !percent)) {
      throw new BadRequestException(
        'you should send one of the percent or amount',
      );
    }

    if (percent && isNaN(percent)) {
      throw new BadRequestException('percent shoud be a number');
    } else {
      discountObject['percent'] = percent;
    }

    if (amount && isNaN(amount)) {
      throw new BadRequestException('amount shoud be anumber');
    } else {
      discountObject['amount'] = amount;
    }

    if (expire_in && new Date(expire_in).toString() == 'Invalid Date') {
      throw new BadRequestException('expire in should be date format');
    } else {
      discountObject['expire_in'] = expire_in;
    }

    const discount = await this.getDiscountByCode(code);
    if (discount) throw new ConflictException('already exist discount code');

    discountObject['code'] = code;

    if (limit && !isNaN(limit)) discountObject['limit'] = limit;

    await this.discountRepository.save(discountObject);
    return { message: 'discount created successfully' };
  }

  async getDiscountByCode(code: string) {
    const discount = await this.discountRepository.findOneBy({ code });
    return discount;
  }
  async updateDiscount(id: number, data: UpdateDiscountDto) {
    const { amount, expire_in, percent, type, limit, code, productId } = data;

    let discount = await this.findOne(id);

    if (type === Type.Product) {
      const product = await this.productService.findOne(productId);
      discount.type = 'product';
      discount.productId = productId;
    } else {
      discount.type = 'basket';
    }

    if (percent && amount) {
      throw new BadRequestException(
        'you should send one of the percent or amount',
      );
    }

    if (percent && isNaN(percent)) {
      throw new BadRequestException('percent shoud be a number');
    } else {
      discount.percent = percent;
    }

    if (amount && isNaN(amount)) {
      throw new BadRequestException('amount shoud be anumber');
    } else {
      discount.amount = amount;
    }

    if (expire_in && new Date(expire_in).toString() == 'Invalid Date') {
      throw new BadRequestException('expire in should be date format');
    } else {
      discount.expire_in = expire_in;
    }

    if (code) {
      const discountCompare = await this.getDiscountByCode(code);
      if (discountCompare && discountCompare.code !== discount.code)
        throw new ConflictException('already exist discount code');
      discount.code = code;
    }

    if (limit && !isNaN(limit)) discount.limit = limit;

    await this.discountRepository.save(discount);
    return { message: 'discount created successfully' };
  }
  async deleteDiscount(id: number) {
    await this.findOne(id);

    await this.discountRepository.delete({ id });
  }
  async findOne(id: number) {
    const discount = await this.discountRepository.findOneBy({ id });
    if (!discount) throw new NotFoundException('discount not found');
    return discount;
  }
}
