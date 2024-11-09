import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from './config/typeorm.config';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { ProductModule } from './module/product/product.module';
import { DiscountModule } from './module/discount/discount.module';
import { BasketModule } from './module/basket/basket.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(process.cwd(), '.env'),
    }),
    TypeOrmModule.forRoot(typeormConfig()),

    ProductModule,
    DiscountModule,
    BasketModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
