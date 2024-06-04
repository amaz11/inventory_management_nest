import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';


@Injectable()
export class SubcategoryService {
  constructor(private readonly databseService: DatabaseService) { }


  async create(createSubcategoryDto: Prisma.SubCategoryCreateInput) {
    return await this.databseService.subCategory.create({
      data: createSubcategoryDto
    });
  }

  async findAll() {
    return await this.databseService.subCategory.findMany();
  }

  async findOne(id: number) {
    const subCategory = await this.databseService.subCategory.findUnique({ where: { id } });
    if (!subCategory) {
      throw new NotFoundException('Sub-category not found.');
    }
    return subCategory
  }

  async update(id: number, updateSubcategoryDto: Prisma.SubCategoryUpdateInput) {
    return await this.databseService.subCategory.update({ where: { id }, data: updateSubcategoryDto });
  }

  async remove(id: number) {
    await this.databseService.subCategory.delete({ where: { id } })
    return;
  }
}
