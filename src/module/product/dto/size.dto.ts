import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';

export class AddSizeDto {
  @ApiProperty()
  productId: number;
  @ApiProperty()
  size: string;
  @ApiProperty()
  count: number;
  @ApiProperty()
  price: number;
  @ApiPropertyOptional()
  discount: number;
  @ApiPropertyOptional()
  active_discount: boolean;
}

export class UpdateSizeDto extends PartialType(AddSizeDto) {}
