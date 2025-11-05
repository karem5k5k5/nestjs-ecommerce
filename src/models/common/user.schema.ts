import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

@Schema({ timestamps: true, discriminatorKey: "role" })
export class User {
    @Prop({
        type: String,
        required: true
    })
    userName: string

    @Prop({
        type: String,
        required: true,
        unique: true
    })
    email: string

    @Prop({
        type: String,
        required: function () {
            if (this.agent == "local") {
                return true
            }
            return false
        }
    })
    password: string

    @Prop({ type: Boolean, default: false })
    isVerified: Boolean

    @Prop({ type: String })
    otp: string

    @Prop({ type: Date })
    otpExpiry: Date

    @Prop({ type: String })
    token: string

    @Prop({ type: String, enum: ["local", "google"], default: "local" })
    agent: string
}

export const userSchema = SchemaFactory.createForClass(User)