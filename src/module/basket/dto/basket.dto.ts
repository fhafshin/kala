import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class AddToBasketDto {
  @ApiProperty()
  @IsNumber()
  productId: number;
  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  colorId: number;
  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  sizeId: number;
}
