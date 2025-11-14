import { hashPassword } from "src/common/utils/hash";
import { RegisterAdminDTO, RegisterDTO, RegisterSellerDTO } from "../dto";
import { Admin, Customer, Seller } from "../entities/auth.entity";
import { generateOTP } from "src/common/utils/otp";

export class AuthFactoryService {
    async createCustomer(registerDTO: RegisterDTO) {
        const customer = new Customer()

        customer.userName = registerDTO.userName
        customer.email = registerDTO.email
        customer.dob = registerDTO.dob
        customer.address = registerDTO.address
        customer.password = await hashPassword(registerDTO.password)
        customer.otp = generateOTP()
        customer.otpExpiry = new Date(Date.now() + 5 * 60 * 1000)
        customer.token = ""

        return customer
    }

    async createAdmin(registerAdminDTO: RegisterAdminDTO) {
        const admin = new Admin()

        admin.userName = registerAdminDTO.userName
        admin.email = registerAdminDTO.email
        admin.password = await hashPassword(registerAdminDTO.password)
        admin.adminSecret = registerAdminDTO.adminSecret
        admin.otp = generateOTP()
        admin.otpExpiry = new Date(Date.now() + 5 * 60 * 1000)
        admin.token = ""

        return admin
    }

    async createSeller(registerSellerDTO: RegisterSellerDTO) {
        const seller = new Seller()

        seller.userName = registerSellerDTO.userName
        seller.email = registerSellerDTO.email
        seller.password = await hashPassword(registerSellerDTO.password)
        seller.whatsappLink = registerSellerDTO.whatsappLink
        seller.otp = generateOTP()
        seller.otpExpiry = new Date(Date.now() + 5 * 60 * 1000)
        seller.token = ""

        return seller
    }
}