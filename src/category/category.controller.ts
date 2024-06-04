import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Prisma } from '@prisma/client';


@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @Post()
  create(@Body() createCategoryDto: Prisma.CategoryCreateInput) {
    const subCategoryArr = createCategoryDto.subCategory as any as any[]
    return this.categoryService.create(createCategoryDto, subCategoryArr);
  }

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: Prisma.CategoryUpdateInput) {
    const subCategoryArr = updateCategoryDto.subCategory as any as any[]

    return this.categoryService.update(+id, updateCategoryDto, subCategoryArr);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
