import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { CategoryFactory } from './factory';
import { CategoryRepository } from 'src/models/category/category.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, categorySchema } from 'src/models/category/category.schema';
import { UserMongoModule } from 'src/shared/modules/user-mongo.module';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Category.name, schema: categorySchema }
  ]),UserMongoModule],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryFactory, CategoryRepository],
  exports: [CategoryService]
})
export class CategoryModule { }
