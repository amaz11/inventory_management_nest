import { Body, Controller, Delete, Get, Param, Patch, Post, } from '@nestjs/common';
import { CrudService } from './crud.service';
import { Prisma } from '@prisma/client';
import { SkipThrottle, Throttle } from '@nestjs/throttler'

@SkipThrottle()
@Controller('crud')
export class CrudController {
  constructor(private readonly crudService: CrudService) { }
  @Post()
  createOne(@Body() createCRUDDTO: Prisma.CrudCreateInput) {
    return this.crudService.createOne(createCRUDDTO);
  }

  // Rate limiting is applied to this route.
  @SkipThrottle({ default: false })
  // Override default configuration for Rate limiting and duration.
  @Throttle({ short: { ttl: 2000, limit: 1 } })
  @Get()
  findAll() {
    return this.crudService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.crudService.findOne(+id)
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCRUDDTO: Prisma.CrudUpdateInput) {
    return this.crudService.update(+id, updateCRUDDTO)
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.crudService.remove(+id)
  }

}
