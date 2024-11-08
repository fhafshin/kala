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
import { SwaggerConsumes } from '../../../common/enum/swagger-consumes.enum';
import { ProductColorService } from '../services/product-color.service';
import { AddColorDto, UpdateColorDto } from '../dto/color.dto';
@ApiTags(ControllerNames.ProductColor)
@Controller(ControllerNames.ProductColor)
export class ColorProductController {
  constructor(private productColorService: ProductColorService) {}

  @Get('find-all')
  findAll() {
    return this.productColorService.findAll();
  }

  @Get('find-one/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productColorService.findOne(id);
  }
  @ApiConsumes(SwaggerConsumes.UrlEncoded)
  @Post('create-color')
  createcolor(@Body() data: AddColorDto) {
    return this.productColorService.createcolor(data);
  }
  @ApiConsumes(SwaggerConsumes.UrlEncoded)
  @Patch('update-color/:id')
  updatecolor(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateColorDto,
  ) {
    return this.productColorService.updatecolor(id, data);
  }

  @Delete('delete-color/:id')
  deletecolor(@Param('id', ParseIntPipe) id: number) {
    return this.productColorService.deletecolor(id);
  }
}
