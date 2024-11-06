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
import { ProductService } from './product.service';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { SwaggerConsumes } from '../../common/enum/swagger-consumes.enum';
@ApiTags('product')
@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Post('/create-product')
  @ApiConsumes(SwaggerConsumes.UrlEncoded)
  createProduct(@Body() data: CreateProductDto) {
    return this.productService.createProduct(data);
  }

  @Get('find-all')
  findAll() {
    return this.productService.findAll();
  }
  @ApiConsumes(SwaggerConsumes.UrlEncoded)
  @Patch('update-product')
  update(@Body() data: UpdateProductDto) {
    return this.productService.update(data);
  }

  @Delete('delete-product')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.productService.delete(id);
  }
}
