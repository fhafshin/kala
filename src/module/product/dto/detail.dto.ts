import { ApiProperty, PartialType } from '@nestjs/swagger';

export class AddDetailDto {
  @ApiProperty()
  productId: number;
  @ApiProperty()
  key: string;
  @ApiProperty()
  value: string;
}

export class UpdateDetailDto extends PartialType(AddDetailDto) {}
