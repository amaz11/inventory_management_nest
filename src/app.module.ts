import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { CrudModule } from './crud/crud.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler'
import { APP_GUARD } from '@nestjs/core';
import { ProductsModule } from './products/products.module';
import { CustomersModule } from './customers/customers.module';
import { AdminModule } from './admin/admin.module';
import { BrandModule } from './brand/brand.module';
import { ProductTypeModule } from './product-type/product-type.module';
import { UnitsModule } from './units/units.module';
import { CategoryModule } from './category/category.module';
import { SubcategoryModule } from './subcategory/subcategory.module';


@Module({
  imports: [DatabaseModule, CrudModule, ThrottlerModule.forRoot([{
    name: 'short',
    ttl: 6000,
    limit: 10
  }, {
    name: 'long',
    ttl: 60000 * 2,
    limit: 15
  }]), ProductsModule, CustomersModule, AdminModule, BrandModule, ProductTypeModule, UnitsModule, CategoryModule, SubcategoryModule],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: ThrottlerGuard
  }],
})
export class AppModule { }
