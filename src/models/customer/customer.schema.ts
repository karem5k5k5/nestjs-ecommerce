import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Types } from "mongoose"

@Schema({ timestamps: true, discriminatorKey: "role" })
export class Customer {
    readonly _id: Types.ObjectId
    userName: string
    email: string
    password: string
    isVerified: Boolean
    otp: string
    otpExpiry: Date
    token: string

    @Prop({ type: String })
    address: string

    @Prop({ type: Date })
    dob: Date
}

export const customerSchema = SchemaFactory.createForClass(Customer)