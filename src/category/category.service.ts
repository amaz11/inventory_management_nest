import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class CategoryService {
  constructor(private readonly databseService: DatabaseService) { }

  async create(createCategoryDto: Prisma.CategoryCreateInput, subCategoryArr: any[]) {
    return await this.databseService.category.create({
      data: {
        name: createCategoryDto.name,
        subCategory: {
          connect: subCategoryArr
        }
      },
      include: {
        subCategory: true
      }
    });
  }

  async findAll() {
    return await this.databseService.category.findMany({
      include: {
        subCategory: true
      }
    });
  }

  async findOne(id: number) {
    const category = await this.databseService.category.findUnique({ where: { id }, include: { subCategory: true } });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category
  }

  async update(id: number, updateCategoryDto: Prisma.CategoryUpdateInput, subCategoryArr: any[]) {
    return await this.databseService.category.update({
      where: { id }, data: {
        name: updateCategoryDto.name,
        subCategory: {
          connect: subCategoryArr
        }
      },
      include: {
        subCategory: true
      }
    });
  }

  async remove(id: number) {
    await this.databseService.category.delete({ where: { id } });
    return;
  }
}
