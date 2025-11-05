import { ConflictException, ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Customer } from './entities/auth.entity';
import { ConfigService } from '@nestjs/config';
import { CustomerRepository } from 'src/models/customer/customer.repository';
import { sendmail } from 'src/common/utils/mail';
import { ForgetPasswordDTO, GoogleLoginDTO, LoginDTO, ResendOTPDTO, VerifyEmailDTO } from './dto';
import { comparePassword, hashPassword } from 'src/common/utils/hash';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/models/common/user.repository';
import { generateOTP } from 'src/common/utils/otp';
import { OAuth2Client, TokenPayload } from 'google-auth-library';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly customerRepository: CustomerRepository,
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService
  ) { }
  async register(customer: Customer) {
    const customerExist = await this.customerRepository.getOne({ email: customer.email })

    if (customerExist) {
      throw new ConflictException("user already exists")
    }

    await this.customerRepository.create(customer)

    await sendmail({
      to: customer.email,
      subject: "Verify Email",
      html: `<p>your otp to verify email is <b>${customer.otp}</b></p>`
    })
  }

  async login(loginDTO: LoginDTO) {
    const userExist = await this.userRepository.getOne({ email: loginDTO.email })

    if (!userExist) {
      throw new UnauthorizedException("invalid credentials")
    }

    const isMatch = await comparePassword(loginDTO.password, userExist.password)

    if (!isMatch) {
      throw new UnauthorizedException("invalid credentials")
    }

    if (!userExist.isVerified) {
      throw new UnauthorizedException("plaese verify your email")
    }

    // generate token
    const token = this.jwtService.sign({ _id: userExist._id, email: userExist.email }, { secret: this.configService.get("jwt_secret"), expiresIn: "24h" })

    await this.userRepository.updateOne({ email: userExist.email }, { token })

    return token
  }

  async logout(req: any) {
    await this.userRepository.updateOne({ _id: req.user._id }, { token: "" })
  }

  async verifyEmail(verifyEmailDTO: VerifyEmailDTO) {
    const userExist = await this.userRepository.getOne({ email: verifyEmailDTO.email })

    if (!userExist) {
      throw new NotFoundException("user not found")
    }

    if (userExist.otp != verifyEmailDTO.otp) {
      throw new ForbiddenException("invalid otp")
    }

    if (userExist.otpExpiry < new Date(Date.now())) {
      throw new ForbiddenException("invalid otp")
    }

    await this.userRepository.updateOne({ email: userExist.email }, { isVerified: true, otp: undefined, otpExpiry: undefined })
  }

  async resendOTP(resendOTPDTO: ResendOTPDTO) {
    const userExist = await this.userRepository.getOne({ email: resendOTPDTO.email })

    if (!userExist) {
      throw new NotFoundException("user not found")
    }

    const otp = generateOTP()
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000)

    await sendmail({
      to: userExist.email,
      subject: "New OTP",
      html: `<p>your new otp to is <b>${otp}</b></p>`
    })

    await this.userRepository.updateOne({ email: userExist.email }, { otp, otpExpiry })
  }

  async forgetPassword(forgetPasswordDTO: ForgetPasswordDTO) {
    const userExist = await this.userRepository.getOne({ email: forgetPasswordDTO.email })

    if (!userExist) {
      throw new NotFoundException("user not found")
    }

    if (userExist.otp != forgetPasswordDTO.otp) {
      throw new ForbiddenException("invalid otp")
    }

    if (userExist.otpExpiry < new Date(Date.now())) {
      throw new ForbiddenException("invalid otp")
    }

    const hashedPassword = await hashPassword(forgetPasswordDTO.newPassword)

    await this.userRepository.updateOne({ email: userExist.email }, { password: hashedPassword, otp: undefined, otpExpiry: undefined })
  }

  async googleLogin(googleLoginDTO: GoogleLoginDTO) {
    const { idToken } = googleLoginDTO

    const client = new OAuth2Client("475515404720-pvf8s4blqbk037papo8mi19alsoa6dm6.apps.googleusercontent.com")

    const ticket = await client.verifyIdToken({ idToken })

    const { name, email } = ticket.getPayload() as TokenPayload

    let customer = await this.customerRepository.getOne({ email })

    if (!customer) {
      await this.customerRepository.create({ userName: name, email, agent: "google", isVerified: true })
    }

    // generate token
    const token = this.jwtService.sign({ _id: customer?._id, email: customer?.email }, { secret: this.configService.get("jwt_secret"), expiresIn: "24h" })

    return token

  }

}
