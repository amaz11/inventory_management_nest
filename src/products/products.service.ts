import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';


@Injectable()
export class ProductsService {
  constructor(private readonly databaseService: DatabaseService) { }
  async create(createProductDto: Prisma.ProductCreateInput) {
    return await this.databaseService.product.create({
      data: createProductDto
    });
  }

  async findAll() {
    return await this.databaseService.product.findMany();
  }

  async findOne(id: number) {
    const product = await this.databaseService.product.findUnique({
      where: { id }
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product
  }

  async update(id: number, updateProductDto: Prisma.ProductUpdateInput) {
    return await this.databaseService.product.update({ where: { id }, data: updateProductDto })
  }

  async remove(id: number) {
    await this.databaseService.product.delete({ where: { id } });
    return
  }
}
