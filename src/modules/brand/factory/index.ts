import slugify from "slugify";
import { Brand } from "../entities/brand.entity";
import { CreateBrandDto } from "../dto/create-brand.dto";
import { UpdateBrandDto } from "../dto/update-brand.dto";

export class BrandFactory {
    createBrand(createBrandDto: CreateBrandDto, user: any) {
        const brand = new Brand()

        brand.name = createBrandDto.name
        brand.slug = slugify(createBrandDto.name, {
            replacement: "-",
            lower: true,
            trim: true
        })
        brand.createdBy = user._id
        brand.updatedBy = user._id

        return brand
    }

    updateBrand(updateBrandDto: UpdateBrandDto, user: any) {
        const brand = new Brand()

        brand.name = updateBrandDto.name
        brand.slug = slugify(updateBrandDto.name, {
            replacement: "-",
            lower: true,
            trim: true
        })
        brand.updatedBy = user._id

        return brand
    }

}