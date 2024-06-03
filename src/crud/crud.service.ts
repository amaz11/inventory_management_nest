import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class CrudService {
    constructor(private readonly databaseService: DatabaseService) { }
    async createOne(createCRUDDTO: Prisma.CrudCreateInput) {
        return await this.databaseService.crud.create({
            data: createCRUDDTO
        })
    }

    async findAll() {
        return await this.databaseService.crud.findMany()
    }

    async findOne(id: number) {
        return await this.databaseService.crud.findUnique({
            where: {
                id
            }
        })
    }

    async update(id: number, updateCRUDDTO: Prisma.CrudUpdateInput) {
        return await this.databaseService.crud.update({
            where: { id },
            data: updateCRUDDTO
        })
    }

    async remove(id: number) {
        return await this.databaseService.crud.delete({
            where: {
                id
            }
        })
    }
}
