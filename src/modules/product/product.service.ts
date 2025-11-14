import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

import { CategoryService } from '../category/category.service';
import { BrandService } from '../brand/brand.service';
import { ProductRepository } from 'src/models/product/product.repository';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository, private readonly categoryService: CategoryService, private readonly brandService: BrandService) { }
  async create(product: Product,user: any) {
    const categoryExist = await this.categoryService.findOne(product.categoryId.toString())
    if (!categoryExist){
      throw new NotFoundException("Category not found")
    }

    const brandExist = await this.brandService.findOne(product.brandId.toString())
    if (!brandExist){
      throw new NotFoundException("Brand not found")
    }

    const productExist = await this.productRepository.getOne({slug: product.slug,createdBy:user.id})
    if (productExist){
      throw new NotFoundException("Product already exists")
    }

    await this.productRepository.create(product)

  }

  async findAll() {
    const products = await this.productRepository.getAll({})
    if (!products){
      throw new NotFoundException("Products not found")
    }
    
    return products
  }

  async findOne(id: string) {
    const product = await this.productRepository.getById(id)
    if (!product){
      throw new NotFoundException("Product not found")
    }
    return product
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.getByIdAndUpdate(id,updateProductDto)
    if (!product){
      throw new NotFoundException("Product not found")
    }
    return product
  }

  async remove(id: string) {
    const product = await this.productRepository.getByIdAndDelete(id)
    if (!product){
      throw new NotFoundException("Product not found")
    }
  }
}
