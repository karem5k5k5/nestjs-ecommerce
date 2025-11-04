export class RegisterDTO {
    userName: string
    email: string
    password: string
    address: string
    dob: Date
}

export class LoginDTO {
    email: string
    password: string
}

export class VerifyEmailDTO {
    email: string
    otp: string
}

export class ResendOTPDTO {
    email: string
}

export class ForgetPasswordDTO {
    email: string
    otp: string
    newPassword: string
}