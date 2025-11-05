import { Transform } from "class-transformer"
import { IsDate, IsEmail, IsNotEmpty, IsNumber, IsString, Length, MaxLength, MinLength } from "class-validator"

export class RegisterDTO {
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(100)
    userName: string

    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @MinLength(6)
    @IsNotEmpty()
    password: string

    @IsString()
    @MinLength(10)
    @MaxLength(200)
    @IsNotEmpty()
    address: string

    @Transform(({ value }) => (
        new Date(value)
    ))
    @IsDate()
    @IsNotEmpty()
    dob: Date
}

export class LoginDTO {
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @MinLength(6)
    @IsNotEmpty()
    password: string
}

export class VerifyEmailDTO {
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsNumber()
    @Length(6)
    otp: string
}

export class ResendOTPDTO {
    @IsEmail()
    @IsNotEmpty()
    email: string
}

export class ForgetPasswordDTO {
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsNumber()
    @Length(6)
    otp: string

    @IsString()
    @MinLength(6)
    @IsNotEmpty()
    newPassword: string
}