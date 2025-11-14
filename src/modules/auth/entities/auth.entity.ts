import { Types } from "mongoose"

export class Customer {
    readonly _id: Types.ObjectId
    userName: string
    email: string
    password: string
    address: string
    dob: Date
    isVerified: Boolean
    otp: string
    otpExpiry: Date
    token: string
}

export class Seller{
    readonly _id: Types.ObjectId
    userName: string
    email: string
    password: string
    whatsappLink: string
    isVerified: Boolean
    otp: string
    otpExpiry: Date
    token: string
}

export class Admin{
    readonly _id: Types.ObjectId
    userName: string
    email: string
    password: string
    adminSecret: string
    isVerified: Boolean
    otp: string
    otpExpiry: Date
    token: string
}