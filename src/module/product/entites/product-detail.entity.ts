import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ProductEntity } from './product.entity';
import { BaseEntity } from '../../../common/abstract/base.entity';

@Entity('product_detail')
export class ProductDetailEntity extends BaseEntity {
  @Column()
  productId: number;
  @Column()
  key: string;
  @Column()
  value: string;

  @ManyToOne(() => ProductEntity, (product) => product.details, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'productId' })
  product: ProductEntity;
}
