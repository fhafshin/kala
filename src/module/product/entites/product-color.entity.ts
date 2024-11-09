import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { ProductEntity } from './product.entity';
import { BaseEntity } from '../../../common/abstract/base.entity';
import { BasketEntity } from '../../basket/entity/basket.entity';

@Entity('product_color')
export class ProductColorEntity extends BaseEntity {
  @Column()
  productId: number;
  @Column()
  color_name: string;
  @Column()
  color_code: string;
  @Column()
  count: number;
  @Column()
  price: number;
  @Column({ type: 'decimal', default: 0 })
  discount: number;
  @Column({ default: false })
  active_discount: boolean;

  @ManyToOne(() => ProductEntity, (product) => product.colors)
  //@JoinColumn({ name: 'productId' })
  product: ProductEntity;

  @OneToMany(() => BasketEntity, (basket) => basket.color)
  baskets: BasketEntity[];
}
