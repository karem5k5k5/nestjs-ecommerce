import { Module } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';
import { BrandFactory } from './factory';
import { BrandRepository } from 'src/models/brand/brand.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Brand, brandSchema } from 'src/models/brand/brand.schema';
import { UserMongoModule } from 'src/shared/modules/user-mongo.module';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Brand.name, schema: brandSchema }
  ]),UserMongoModule],
  controllers: [BrandController],
  providers: [BrandService, BrandFactory, BrandRepository],
  exports: [BrandService]
})
export class BrandModule {}
