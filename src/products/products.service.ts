import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';


@Injectable()
export class ProductsService {
  constructor(private readonly databaseService: DatabaseService) { }
  async create(createProductDto: Prisma.ProductCreateInput) {
    console.log(createProductDto);
    const categoryArr = createProductDto.category as any as any[]
    const subCategoryArr = createProductDto.subCategory as any as any[]
    return await this.databaseService.product.create({
      data: {
        ...createProductDto,
        category: {
          connect: categoryArr
        },
        subCategory: {
          connect: subCategoryArr
        }
      },
      include: {
        brand: true,
        category: true,
        subCategory: true,
        productType: true,
        productImage: true,
        units: true,
      }
    });
  }

  async findAll() {
    return await this.databaseService.product.findMany({
      include: {
        brand: true,
        category: true,
        subCategory: true,
        productType: true,
        productImage: true,
        units: true,
      }
    });
  }

  async findOne(id: number) {
    const product = await this.databaseService.product.findUnique({
      where: { id },
      include: {
        brand: true,
        category: true,
        subCategory: true,
        productType: true,
        productImage: true,
        units: true,
      }
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product
  }

  async update(id: number, updateProductDto: Prisma.ProductUpdateInput) {
    const categoryArr = updateProductDto.category as any as any[]
    const subCategoryArr = updateProductDto.subCategory as any as any[]

    return await this.databaseService.product.update({
      where: { id }, data: {
        ...updateProductDto,
        category: {
          connect: categoryArr,
          disconnect: []
        },
        subCategory: {
          connect: subCategoryArr,
          disconnect: []
        }
      }, include: {
        brand: true,
        category: true,
        subCategory: true,
        productType: true,
        productImage: true,
        units: true,
      }
    })
  }

  async remove(id: number) {
    await this.databaseService.product.delete({ where: { id } });
    return
  }
}
