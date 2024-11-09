import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../common/abstract/base.entity';
import { Type } from '../enum/type.enum';

@Entity('discount')
export class DiscountEntity extends BaseEntity {
  @Column({ unique: true })
  code: string;
  @Column({ type: 'decimal', nullable: true })
  percent: number;
  @Column({ nullable: true, type: 'decimal' })
  amount: number;
  @Column({ nullable: true })
  limit: number;
  @Column({ nullable: true, default: 0 })
  usage: number;
  @Column({ type: 'timestamp' })
  expire_in: Date;
  @Column({ nullable: true })
  productId: number;
  @Column({ type: 'enum', enum: Type })
  type: string;
}
