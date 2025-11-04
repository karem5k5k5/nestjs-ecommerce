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
