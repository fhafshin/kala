import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { AddToBasketDto } from './dto/basket.dto';
import { BasketService } from './basket.service';
import { ApiConsumes } from '@nestjs/swagger';
import { SwaggerConsumes } from '../../common/enum/swagger-consumes.enum';

@Controller()
export class BasketController {
  constructor(private basketService: BasketService) {}

  @Get('find-one')
  basket() {}
  @ApiConsumes(SwaggerConsumes.UrlEncoded)
  @Post('add')
  addToBasket(@Body() data: AddToBasketDto) {
    return this.basketService.addToBasket(data);
  }

  @Post('add-discount')
  addDiscountToBasket() {}

  @Delete('remove/:id')
  removeFromDiscount(@Param('id', ParseIntPipe) id: number) {}

  @Delete('remove-discount/:id')
  removeDiscountFromBasket(@Param('id', ParseIntPipe) id: number) {}
}
