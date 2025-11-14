import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { BrandRepository } from 'src/models/brand/brand.repository';
import { Brand } from './entities/brand.entity';
import { Types } from 'mongoose';

@Injectable()
export class BrandService {
  constructor(private readonly brandRepository: BrandRepository) { }
  async create(brand: Brand) {
    const brandExist = await this.brandRepository.getOne({ slug: brand.slug })
    if (brandExist) {
      throw new ConflictException("brand already exists")
    }
    await this.brandRepository.create(brand)
  }

  async findAll() {
    const brands = await this.brandRepository.getAll({})
    if (brands.length < 1) {
      throw new NotFoundException("no brands found")
    }
    return brands
  }

  async findOne(id: string) {
    const brand = await this.brandRepository.getById(id)
    if (!brand) {
      throw new NotFoundException("brand not found")
    }
    return brand
  }

  async update(id: string, brand: Brand) {
    const brandExist = await this.brandRepository.getOne({ slug: brand.slug, _id: { $ne: new Types.ObjectId(id) } })
    if (brandExist) {
      throw new ConflictException("brand already exist")
    }

    const updatedBrand = await this.brandRepository.getByIdAndUpdate(id, brand)

    if (!updatedBrand) {
      throw new NotFoundException("brand not found")
    }
  }

  async remove(id: string) {
    const brand = await this.brandRepository.getByIdAndDelete(id)
    if (!brand) {
      throw new NotFoundException("brand not found")
    }
    return brand
  }
}
