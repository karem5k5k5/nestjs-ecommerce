import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Types } from "mongoose"

@Schema({ timestamps: true, discriminatorKey: "role" })
export class Admin {
    readonly _id: Types.ObjectId
    userName: string
    email: string
    password: string
    isVerified: Boolean
    otp: string
    otpExpiry: Date
    token: string
    agent:string

    @Prop({type:String})
    adminSecretKey:string
}

export const adminSchema = SchemaFactory.createForClass(Admin)