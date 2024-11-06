import { BaseEntity } from '../../../common/abstract/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ProductEntity } from './product.entity';

@Entity('product_size')
export class ProductSizeEntity extends BaseEntity {
  @Column()
  productId: number;
  @Column()
  size: string;
  @Column()
  count: number;
  @Column({ type: 'decimal' })
  price: number;
  @Column({ type: 'decimal', default: 0 })
  discount: number;
  @Column({ default: false })
  active_discount: boolean;

  @ManyToOne(() => ProductEntity, (product) => product.sizes)
  @JoinColumn({ name: 'productId' })
  product: ProductEntity;
}
