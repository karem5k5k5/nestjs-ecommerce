import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductFactory } from './factory';
import { User } from 'src/common/decorators/user.decorator';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService, private readonly productFactory: ProductFactory) { }

  @Post()
  async create(@Body() createProductDto: CreateProductDto, @User() user: any) {
    const product = this.productFactory.createProduct(createProductDto, user);

    await this.productService.create(product, user);

    return { success: true, message: "product created successfully" }
  }

  @Get()
  async findAll() {
    const products = await this.productService.findAll();

    return { success: true, data: products }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const product = await this.productService.findOne(id);

    return { success: true, data: product }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    await this.productService.update(id, updateProductDto);

    return { success: true, message: "Product updated successfully" }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.productService.remove(id);

    return { success: true, message: "Product removed successfully" }
  }
}
