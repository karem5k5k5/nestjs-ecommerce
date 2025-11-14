import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';
import { User } from 'src/common/decorators/user.decorator';
import { CategoryFactory } from './factory';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Public } from 'src/common/decorators/public.decorator';


@Controller('category')
@Roles(["Admin", "Seller"])
@UseGuards(AuthGuard, RolesGuard)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService, private readonly categoryFactory: CategoryFactory) { }

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto, @User() user: any) {
    const category = this.categoryFactory.createCategory(createCategoryDto, user)

    await this.categoryService.create(category)

    return { success: true, message: "category created successfully" }
  }

  @Get()
  @Public()
  async findAll() {
    const categories = await this.categoryService.findAll();

    return { success: true, data: categories }
  }

  @Get(':id')
  @Public()
  async findOne(@Param('id') id: string) {
    const category = await this.categoryService.findOne(id);

    return { success: true, data: category }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto, @User() user: any) {
    const category = this.categoryFactory.updateCategory(updateCategoryDto, user)

    await this.categoryService.update(id, category)

    return { success: true, message: "category updated successfully" }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.categoryService.remove(id)

    return { success: true, message: "category deleted successfully" }
  }
}
