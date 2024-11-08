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
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { ProductController } from './product.controller';
import { ControllerNames } from '../../../common/enum/controller-name.enum';
import { AddDetailDto, UpdateDetailDto } from '../dto/detail.dto';
import { ProductDetailService } from '../services/product-detail.service';
import { SwaggerConsumes } from '../../../common/enum/swagger-consumes.enum';
@ApiTags(ControllerNames.ProductDetail)
@Controller(ControllerNames.ProductDetail)
export class DetailProductController {
  constructor(private productDetailService: ProductDetailService) {}

  @Get('find-all')
  findAll() {
    return this.productDetailService.findAll();
  }

  @Get('find-one/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productDetailService.findOne(id);
  }
  @ApiConsumes(SwaggerConsumes.UrlEncoded)
  @Post('create-detail')
  createDetail(@Body() data: AddDetailDto) {
    return this.productDetailService.createDetail(data);
  }
  @ApiConsumes(SwaggerConsumes.UrlEncoded)
  @Patch('update-detail/:id')
  updateDetail(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateDetailDto,
  ) {
    return this.productDetailService.updateDetail(id, data);
  }

  @Delete('delete-detail/:id')
  deleteDetail(@Param('id', ParseIntPipe) id: number) {
    return this.productDetailService.deleteDetail(id);
  }
}
