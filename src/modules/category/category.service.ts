import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Category } from './entities/category.entity';
import { CategoryRepository } from 'src/models/category/category.repository';
import { Types } from 'mongoose';


@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) { }
  async create(category: Category) {
    const categoryExist = await this.categoryRepository.getOne({ slug: category.slug })

    if (categoryExist) {
      throw new ConflictException("category already exist")
    }

    await this.categoryRepository.create(category)
  }

  async findAll() {
    const categories = await this.categoryRepository.getAll({})

    if (categories.length < 1) {
      throw new NotFoundException("no categories found")
    }

    return categories
  }

  async findOne(id: string) {
    const category = await this.categoryRepository.getById(id)

    if (!category) {
      throw new NotFoundException("category not found")
    }

    return category
  }

  async update(id: string, category: Category) {

    const categoryExist = await this.categoryRepository.getOne({slug: category.slug, _id: { $ne: new Types.ObjectId(id) }})

    if (categoryExist) {
      throw new ConflictException("category already exist")
    }

    const updatedCategory = await this.categoryRepository.getByIdAndUpdate(id, category)

    if (!updatedCategory) {
      throw new NotFoundException("category not found")
    }
  }

  async remove(id: string) {
    const category = await this.categoryRepository.getByIdAndDelete(id)

    if (!category) {
      throw new NotFoundException("category not found")
    }
  }
}
