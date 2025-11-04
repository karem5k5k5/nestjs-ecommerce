import { hashPassword } from "src/common/utils/hash";
import { RegisterDTO } from "../dto";
import { Customer } from "../entities/auth.entity";
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
}