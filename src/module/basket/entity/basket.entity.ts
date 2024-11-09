import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../common/abstract/base.entity';
import { ProductEntity } from '../../product/entites/product.entity';
import { ProductColorEntity } from '../../product/entites/product-color.entity';
import { ProductSizeEntity } from '../../product/entites/product-size.entity';
import { SizeProductController } from '../../product/controllers/size-product.controller';
import { DiscountEntity } from '../../discount/entity/discount.entity';

@Entity('basket')
export class BasketEntity extends BaseEntity {
  @Column({ nullable: true })
  productId: number;
  @Column({ nullable: true })
  colorId: number;
  @Column({ nullable: true })
  sizeId: number;
  @Column({ nullable: true })
  discountId: number;
  @Column()
  count: number;

  @ManyToOne(() => ProductEntity, (product) => product.baskets, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'productId' })
  product: ProductEntity;

  @ManyToOne(() => ProductColorEntity, (color) => color.baskets, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'colorId' })
  color: ProductColorEntity;

  @ManyToOne(() => ProductSizeEntity, (size) => size.baskets, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'sizeId' })
  size: ProductSizeEntity;

  @ManyToOne(() => DiscountEntity, (discount) => discount.baskets, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'discountId' })
  discount: DiscountEntity;
}
