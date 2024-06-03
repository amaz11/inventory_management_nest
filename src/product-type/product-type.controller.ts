import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductTypeService } from './product-type.service';
import { Prisma } from '@prisma/client';

@Controller('product-type')
export class ProductTypeController {
  constructor(private readonly productTypeService: ProductTypeService) { }

  @Post()
  create(@Body() createProductTypeDto: Prisma.ProductTypeCreateInput) {
    return this.productTypeService.create(createProductTypeDto);
  }

  @Get()
  findAll() {
    return this.productTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productTypeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductTypeDto: Prisma.ProductTypeUpdateInput) {
    return this.productTypeService.update(+id, updateProductTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productTypeService.remove(+id);
  }
}
