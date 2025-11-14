import { Prop, SchemaFactory } from "@nestjs/mongoose"
import { SchemaTypes, Types } from "mongoose"

export class Brand {
    readonly _id: Types.ObjectId
    @Prop({ type: String, required: true, unique: true, trim: true })
    name: string
    @Prop({ type: String, required: true, unique: true, trim: true })
    slug: string
    @Prop({ type: SchemaTypes.ObjectId, ref: "User", required: true })
    createdBy: Types.ObjectId
    @Prop({ type: SchemaTypes.ObjectId, ref: "User", required: true })
    updatedBy: Types.ObjectId
}

export const brandSchema = SchemaFactory.createForClass(Brand)