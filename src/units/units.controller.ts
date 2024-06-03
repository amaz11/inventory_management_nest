import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UnitsService } from './units.service';
import { Prisma } from '@prisma/client';


@Controller('units')
export class UnitsController {
  constructor(private readonly unitsService: UnitsService) { }

  @Post()
  create(@Body() createUnitDto: Prisma.UnitsCreateInput) {
    return this.unitsService.create(createUnitDto);
  }

  @Get()
  findAll() {
    return this.unitsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.unitsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUnitDto: Prisma.UnitsUpdateInput) {
    return this.unitsService.update(+id, updateUnitDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.unitsService.remove(+id);
  }
}
