import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  UpdateDateColumn,
} from 'typeorm';
import { BaseEntity } from '../../../common/abstract/base.entity';
import { ProductDetailEntity } from './product-detail.entity';
import { ProductColorEntity } from './product-color.entity';
import { ProductSizeEntity } from './product-size.entity';
import { ProductType } from '../enum/type.enum';
@Entity('product')
export class ProductEntity extends BaseEntity {
  @Column({ enum: ProductType })
  type: string;
  @Column()
  title: string;
  @Column()
  content: string;
  @Column()
  slug: string;
  @Column()
  code: string;
  @Column({ default: 0 })
  count: number;
  @Column({ nullable: true, type: 'decimal' })
  price: number;
  @Column({ nullable: true, type: 'decimal' })
  discount: number;
  @Column({ nullable: true, default: false })
  active_discount: boolean;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => ProductDetailEntity, (detail) => detail.product)
  details: ProductDetailEntity[];
  @OneToMany(() => ProductColorEntity, (color) => color.product)
  colors: ProductColorEntity[];

  @OneToMany(() => ProductSizeEntity, (size) => size.product)
  sizes: ProductSizeEntity[];
}
