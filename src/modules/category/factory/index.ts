import slugify from "slugify";
import { CreateCategoryDto, UpdateCategoryDto } from "../dto";
import { Category } from "../entities/category.entity";

export class CategoryFactory {
    createCategory(createCategoryDto: CreateCategoryDto, user: any) {
        const category = new Category()

        category.name = createCategoryDto.name
        category.slug = slugify(createCategoryDto.name, {
            replacement: "-",
            lower: true,
            trim: true
        })
        category.createdBy = user._id
        category.updatedBy = user._id

        return category
    }

    updateCategory(updateCategoryDto: UpdateCategoryDto, user: any) {
        const category = new Category()

        category.name = updateCategoryDto.name
        category.slug = slugify(updateCategoryDto.name, {
            replacement: "-",
            lower: true,
            trim: true
        })
        category.updatedBy = user._id

        return category
    }

}