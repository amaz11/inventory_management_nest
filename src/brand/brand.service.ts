import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class BrandService {
  constructor(private readonly databseService: DatabaseService) { }

  async create(createBrandDto: Prisma.BrandCreateInput) {
    return await this.databseService.brand.create({
      data: createBrandDto
    });
  }

  async findAll() {
    return await this.databseService.brand.findMany();
  }

  async findOne(id: number) {
    const brand = await this.databseService.brand.findUnique({ where: { id } });
    if (!brand) {
      throw new NotFoundException('Product not found');
    }
    return
  }

  async update(id: number, updateBrandDto: Prisma.BrandUpdateInput) {
    return await this.databseService.brand.update({ where: { id }, data: updateBrandDto });
  }

  async remove(id: number) {
    await this.databseService.brand.delete({ where: { id } });
    return;
  }
}
