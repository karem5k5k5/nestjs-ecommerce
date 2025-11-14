import { Types } from "mongoose"
import { DiscountType } from "src/models/product/product.schema"

export class Product {
    readonly _id: Types.ObjectId
    // strings
    name: string
    slug: string
    description: string
    // ids
    categoryId: Types.ObjectId
    brandId: Types.ObjectId
    createdBy: Types.ObjectId
    updatedBy: Types.ObjectId
    // numbers
    price: number
    stock: number
    sold: number
    discountType: DiscountType
    discountAmount: number
    finalPrice: number
    // specs
    colors: string[]
    sizes: string[]
}
