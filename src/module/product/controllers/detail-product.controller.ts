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
import { ApiTags } from '@nestjs/swagger';
import { ProductController } from './product.controller';
import { ControllerNames } from '../../../common/enum/controller-name.enum';
import { AddDetailDto, UpdateDetailDto } from '../dto/detail.dto';
@ApiTags(ControllerNames.ProductDetail)
@Controller(ControllerNames.ProductDetail)
export class DetailProductController {
  constructor() {}

  @Get('find-all')
  findAll() {}

  @Get('find-one')
  findOne(@Param('id', ParseIntPipe) id: number) {}

  @Post('create-detail')
  createDetail(@Body() data: AddDetailDto) {}

  @Patch('update-detail')
  updateDetail(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateDetailDto,
  ) {}

  @Delete('delete-detail')
  deleteDetail(@Param('id', ParseIntPipe) id: number) {}
}
