import { Prop, Schema, SchemaFactory, Virtual } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";

export enum DiscountType {
    PERCENTAGE = "percentage",
    FIXED = "fixed"
}

@Schema({ timestamps: true })
export class Product {
    readonly _id: Types.ObjectId
    // strings
    @Prop({ type: String, required: true })
    name: string
    @Prop({ type: String, required: true })
    slug: string
    @Prop({ type: String, required: true })
    description: string
    // ids
    @Prop({ type: SchemaTypes.ObjectId, required: true, ref: 'Category' })
    categoryId: Types.ObjectId
    @Prop({ type: SchemaTypes.ObjectId, required: true, ref: 'Brand' })
    brandId: Types.ObjectId
    @Prop({ type: SchemaTypes.ObjectId, required: true, ref: 'User' })
    createdBy: Types.ObjectId
    @Prop({ type: SchemaTypes.ObjectId, required: false, ref: 'User' })
    updatedBy: Types.ObjectId
    // numbers
    @Prop({ type: Number, required: true })
    price: number
    @Prop({ type: Number, required: true })
    stock: number
    @Prop({ type: Number, default: 1,min: 0 })
    sold: number
    @Prop({ type: String, enum: DiscountType, default: DiscountType.FIXED })
    discountType: DiscountType
    @Prop({ type: Number, min: 0 })
    discountAmount: number
    @Virtual({
        get: function (this: Product) {
            if (this.discountType === DiscountType.FIXED) {
                return this.price - (this.discountAmount || 0);
            }
            return this.price - ((this.discountAmount || 0) / 100) * this.price;
        }
    })
    finalPrice: number
    // specs
    @Prop({ type: [String], default: [] })
    colors: string[]
    @Prop({ type: [String], default: [] })
    sizes: string[]
}

export const productSchema = SchemaFactory.createForClass(Product);