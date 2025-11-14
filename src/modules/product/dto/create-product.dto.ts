import { IsArray, IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, Min, MinLength } from "class-validator"
import { Types } from "mongoose"
import { DiscountType } from "src/models/product/product.schema"

export class CreateProductDto {
    // strings
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(100) 
    name: string
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(100) 
    description: string
    // ids
    @IsMongoId()
    @IsNotEmpty()
    categoryId: Types.ObjectId
    @IsMongoId()
    @IsNotEmpty()
    brandId: Types.ObjectId
    // numbers
    @IsNumber()
    @IsNotEmpty()
    price: number
    @IsNumber()
    @IsNotEmpty()
    @Min(0)
    stock: number
    @IsEnum(DiscountType)
    @IsOptional()
    discountType: DiscountType
    @IsNumber()
    @IsNotEmpty()
    @Min(0)
    discountAmount: number
    // specs
    @IsArray()
    @IsString({ each: true })
    colors: string[]
    @IsArray()
    @IsString({ each: true })
    sizes: string[]
}
