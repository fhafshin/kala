import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { DiscountService } from './discount.service';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { ControllerNames } from '../../common/enum/controller-name.enum';
import { SwaggerConsumes } from '../../common/enum/swagger-consumes.enum';
import { CreateDiscountDto, UpdateDiscountDto } from './dto/discount.dto';
@ApiTags(ControllerNames.Discount)
@Controller(ControllerNames.Discount)
export class DiscountController {
  constructor(private discountService: DiscountService) {}
  @ApiConsumes(SwaggerConsumes.UrlEncoded)
  @Post('create-discount')
  createDiscount(@Body() data: CreateDiscountDto) {
    return this.discountService.createDiscount(data);
  }

  @ApiConsumes(SwaggerConsumes.UrlEncoded)
  @Patch('update-discount/:id')
  updateDiscount(
    @Param('id', ParseIntPipe) id: number,
    data: UpdateDiscountDto,
  ) {
    return this.discountService.updateDiscount(id, data);
  }

  @Delete('delete-discount/:id')
  deleteDiscount(id: number) {
    return this.discountService.deleteDiscount(id);
  }
  @Get('find-one/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.discountService.findOne(id);
  }
}
