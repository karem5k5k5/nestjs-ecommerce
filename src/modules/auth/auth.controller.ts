import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ForgetPasswordDTO, GoogleLoginDTO, LoginDTO, RegisterAdminDTO, RegisterDTO, RegisterSellerDTO, ResendOTPDTO, VerifyEmailDTO } from './dto';
import { AuthFactoryService } from './factory';
import { AuthGuard } from 'src/common/guards/auth.guard';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly authFactoryService: AuthFactoryService) { }

  @Post('register')
  async register(@Body() registerDTO: RegisterDTO) {
    const customer = await this.authFactoryService.createCustomer(registerDTO)

    await this.authService.register(customer)

    return { success: true, message: "customer registered successfully" }
  }

  @Post('register-seller')
  async registerSeller(@Body() registerSellerDTO: RegisterSellerDTO) {
    const seller = await this.authFactoryService.createSeller(registerSellerDTO)

    await this.authService.registerSeller(seller)

    return { success: true, message: "seller registered successfully" }
  }

  @Post('register-admin')
  async registerAdmin(@Body() registerAdminDTO: RegisterAdminDTO) {
    const admin = await this.authFactoryService.createAdmin(registerAdminDTO)

    await this.authService.registerAdmin(admin)

    return { success: true, message: "admin registered successfully" }
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() loginDTO: LoginDTO) {
    const token = await this.authService.login(loginDTO)

    return { success: true, message: "login successfully", token }
  }

  @Post("logout")
  @HttpCode(200)
  @UseGuards(AuthGuard)
  async logout(@Request() req: any) {
    await this.authService.logout(req)

    return { success: true, message: "logout successfully" }
  }

  @Post("verify-email")
  @HttpCode(200)
  async verifyEmail(@Body() verifyEmailDTO: VerifyEmailDTO) {
    await this.authService.verifyEmail(verifyEmailDTO)
    return { success: true, message: "email verified successfully" }
  }

  @Post("resend-otp")
  @HttpCode(200)
  async resendOTP(@Body() resendOTPDTO: ResendOTPDTO) {
    await this.authService.resendOTP(resendOTPDTO)
    return { success: true, message: "new otp sent successfully" }
  }

  @Patch("forget-password")
  @HttpCode(200)
  async forgetPassword(@Body() forgetPasswordDTO: ForgetPasswordDTO) {
    await this.authService.forgetPassword(forgetPasswordDTO)
    return { success: true, message: "reset password successfully" }
  }

  @Post("google-login")
  async googleLogin(@Body() googleLoginDTO: GoogleLoginDTO) {
    const token = await this.authService.googleLogin(googleLoginDTO)

    return { success: true, message: "login successfully", token }
  }
}
