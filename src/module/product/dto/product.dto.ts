import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { ProductType } from '../enum/type.enum';

export class CreateProductDto {
  @ApiProperty()
  title: string;
  @ApiProperty()
  content: string;
  @ApiProperty()
  slug: string;
  @ApiProperty()
  code: string;
  @ApiPropertyOptional()
  price: number;
  @ApiPropertyOptional()
  discount: number;
  @ApiPropertyOptional()
  active_discount: boolean;
  @ApiProperty()
  count: number;
  @ApiProperty({ enum: ProductType })
  type: string;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}
