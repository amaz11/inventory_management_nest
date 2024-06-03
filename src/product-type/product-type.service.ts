import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductTypeService {
  constructor(private readonly databseService: DatabaseService) { }

  async create(createProductTypeDto: Prisma.ProductTypeCreateInput) {
    return await this.databseService.productType.create({
      data: createProductTypeDto
    });
  }

  async findAll() {
    return await this.databseService.productType.findMany();
  }

  async findOne(id: number) {
    const productType = await this.databseService.productType.findUnique({ where: { id } });
    if (!productType) {
      throw new NotFoundException('Product-Type not found');
    }
    return productType

  }

  async update(id: number, updateProductTypeDto: Prisma.ProductTypeUpdateInput) {
    return await this.databseService.productType.update({ where: { id }, data: updateProductTypeDto });
  }

  async remove(id: number) {
    await this.databseService.productType.delete({ where: { id } });
    return;
  }
}
