import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { ProductService } from '../product.service';
import { CreateProductDto, UpdateProductDto } from '../dto/product.dto';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { SwaggerConsumes } from '../../../common/enum/swagger-consumes.enum';
import { ControllerNames } from '../../../common/enum/controller-name.enum';
@ApiTags(ControllerNames.Product)
@Controller(ControllerNames.Product)
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Post('/create-product')
  @ApiConsumes(SwaggerConsumes.UrlEncoded)
  createProduct(@Body() data: CreateProductDto) {
    return this.productService.createProduct(data);
  }
  @Get('find-one/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productService.findOne(id);
  }
  @Get('find-all')
  findAll() {
    return this.productService.findAll();
  }
  @ApiConsumes(SwaggerConsumes.UrlEncoded)
  @Patch('update-product/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateProductDto,
  ) {
    console.log(data);
    return this.productService.update(id, data);
  }

  @Delete('delete-product/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.productService.delete(id);
  }
}
