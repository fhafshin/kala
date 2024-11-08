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
import { ControllerNames } from '../../../common/enum/controller-name.enum';
import { AddSizeDto, UpdateSizeDto } from '../dto/size.dto';
import { ProductSizeService } from '../services/product-size.service';
import { SwaggerConsumes } from '../../../common/enum/swagger-consumes.enum';
@ApiTags(ControllerNames.ProductSize)
@Controller(ControllerNames.ProductSize)
export class SizeProductController {
  constructor(private productSizeService: ProductSizeService) {}

  @Get('find-all')
  findAll() {
    return this.productSizeService.findAll();
  }

  @Get('find-one/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productSizeService.findOne(id);
  }
  @ApiConsumes(SwaggerConsumes.UrlEncoded)
  @Post('create-size')
  createSize(@Body() data: AddSizeDto) {
    return this.productSizeService.createSize(data);
  }
  @ApiConsumes(SwaggerConsumes.UrlEncoded)
  @Patch('update-size/:id')
  updateSize(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateSizeDto,
  ) {
    return this.productSizeService.updateSize(id, data);
  }

  @Delete('delete-size/:id')
  deleteSize(@Param('id', ParseIntPipe) id: number) {
    return this.productSizeService.deleteSize(id);
  }
}
