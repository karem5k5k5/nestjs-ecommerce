import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Types } from "mongoose"

@Schema({ timestamps: true, discriminatorKey: "role" })
export class Seller {
    readonly _id: Types.ObjectId
    userName: string
    email: string
    password: string
    isVerified: Boolean
    otp: string
    otpExpiry: Date
    token: string
    agent:string

    @Prop({ type: String })
    whatsappLink: string
}

export const sellerSchema = SchemaFactory.createForClass(Seller)