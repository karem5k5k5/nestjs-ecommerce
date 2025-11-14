import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { BrandFactory } from './factory';
import { User } from 'src/common/decorators/user.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('brand')
@Roles(["Admin","Seller"])
@UseGuards(AuthGuard, RolesGuard)
export class BrandController {
  constructor(private readonly brandService: BrandService, private readonly brandFactory: BrandFactory) {}

  @Post()
  async create(@Body() createBrandDto: CreateBrandDto, @User() user: any) {
    const brand = this.brandFactory.createBrand(createBrandDto, user)

    await this.brandService.create(brand)

    return { success: true, message: "brand created successfully" }
  }

  @Get()
  @Public()
  async findAll() {
    const brands = await this.brandService.findAll()

    return { success: true, data: brands }
  }

  @Get(':id')
  @Public()
  async findOne(@Param('id') id: string) {
    const brand = await this.brandService.findOne(id)

    return { success: true, data: brand }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateBrandDto: UpdateBrandDto, @User() user: any) {
    const brand = this.brandFactory.updateBrand(updateBrandDto, user)

    await this.brandService.update(id, brand)

    return { success: true, message: "brand updated successfully" }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.brandService.remove(id)

    return { success: true, message: "brand deleted successfully" }
  }
}
