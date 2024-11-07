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
import { ControllerNames } from '../../../common/enum/controller-name.enum';
import { AddSizeDto, UpdateSizeDto } from '../dto/size.dto';
@ApiTags(ControllerNames.ProductSize)
@Controller(ControllerNames.ProductSize)
export class SizeProductController {
  constructor() {}

  @Get('find-all')
  findAll() {}

  @Get('find-one')
  findOne(@Param('id', ParseIntPipe) id: number) {}

  @Post('create-size')
  createSize(@Body() data: AddSizeDto) {}

  @Patch('update-size')
  updateSize(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateSizeDto,
  ) {}

  @Delete('delete-size')
  deleteSize(@Param('id', ParseIntPipe) id: number) {}
}
