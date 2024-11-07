import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';

export class AddColorDto {
  @ApiProperty()
  productId: number;
  @ApiProperty()
  color_name: string;
  @ApiProperty()
  color_code: string;
  @ApiProperty()
  count: number;
  @ApiProperty()
  price: number;
  @ApiPropertyOptional()
  discount: number;
  @ApiPropertyOptional()
  active_discount: boolean;
}
export class UpdateColorlDto extends PartialType(AddColorDto) {}
