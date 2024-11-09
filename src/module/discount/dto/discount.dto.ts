import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDate,
  IsDecimal,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Type } from '../enum/type.enum';

export class CreateDiscountDto {
  @ApiProperty()
  @IsString()
  code: string;
  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  percent: number;
  @ApiPropertyOptional()
  @IsDecimal()
  @IsOptional()
  amount: number;
  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  limit: number;
  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  usage: number;
  @ApiProperty()
  @IsDate()
  expire_in: Date;
  @ApiProperty({ enum: Type })
  type: string;
  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  productId: number;
}

export class UpdateDiscountDto extends CreateDiscountDto {}
