import { Controller, Get, Post, Body, Patch, Param, Delete, ForbiddenException } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Prisma } from '@prisma/client';


@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post()
  create(@Body() createProductDto: Prisma.ProductCreateInput) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBody) {
    const updateProductDto = {
      name: updateBody.name,
      brandId: updateBody.brandId,
      unitsId: updateBody.unitsId,
      typeId: updateBody.typeId,
      productCode: updateBody.productCode,
      barCode: updateBody.barCode,
      quantity: updateBody.quantity,
      quantityAlert: updateBody.quantity,
      price: updateBody.price,
      description: updateBody.description,
      isRefrigerate: updateBody.isRefrigerate,
    }
    const { category, subCategory, disCategory, disSubCategory } = updateBody;
    return this.productsService.update(+id, updateProductDto, category, subCategory, disCategory, disSubCategory);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
