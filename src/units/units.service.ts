import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';


@Injectable()
export class UnitsService {
  constructor(private readonly databaseService: DatabaseService) { }

  async create(createUnitDto: Prisma.UnitsCreateInput) {
    return await this.databaseService.units.create({ data: createUnitDto });
  }

  async findAll() {
    return await this.databaseService.units.findMany();
  }

  async findOne(id: number) {
    const units = await this.databaseService.units.findUnique({ where: { id } })
    if (!units) {
      throw new NotFoundException('Units not found')
    }
    return units;
  }

  async update(id: number, updateUnitDto: Prisma.UnitsUpdateInput) {
    return await this.databaseService.units.update({ where: { id }, data: updateUnitDto });
  }

  async remove(id: number) {
    await this.databaseService.units.delete({ where: { id } })
    return;
  }
}
