import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductFactory } from './factory';
import { ProductRepository } from 'src/models/product/product.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { productSchema } from 'src/models/product/product.schema';
import { Product } from './entities/product.entity';
import { CategoryModule } from '../category/category.module';
import { BrandModule } from '../brand/brand.module';

@Module({
  imports:[MongooseModule.forFeature([{ name: Product.name, schema: productSchema }]),CategoryModule,BrandModule],
  controllers: [ProductController],
  providers: [ProductService,ProductFactory,ProductRepository],
})
export class ProductModule {}
