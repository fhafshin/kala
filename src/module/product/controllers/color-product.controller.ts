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
import { AddColorDto, UpdateColorlDto } from '../dto/color.dto';
@ApiTags(ControllerNames.ProductColor)
@Controller(ControllerNames.ProductColor)
export class ColorProductController {
  constructor() {}

  @Get('find-all')
  findAll() {}

  @Get('find-one')
  fi0ndOne(@Param('id', ParseIntPipe) id: number) {}

  @Post('create-color')
  createColor(@Body() data: AddColorDto) {}
  @Patch('update-color')
  updateColor(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateColorlDto,
  ) {}

  @Delete('delete-color')
  deleteColor(@Param('id', ParseIntPipe) id: number) {}
}
