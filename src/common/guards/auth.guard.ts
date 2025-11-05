import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CustomerRepository } from 'src/models/customer/customer.repository';

interface IPayload {
    _id: string
    role: string
    email: string
}

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
        private readonly customerRepository: CustomerRepository,
    ) { }
    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {
        try {
            const request = context.switchToHttp().getRequest();

            const token = request.headers.authorization

            const payload = this.jwtService.verify<IPayload>(token, { secret: this.configService.get("jwt_secret") })

            const customer = await this.customerRepository.getById(payload._id)

            if (!customer) {
                throw new UnauthorizedException("invalid token")
            }

            if (customer.token != token) {
                throw new UnauthorizedException("invalid token")
            }

            request.user = customer
            return true;
        } catch (error) {
            throw new InternalServerErrorException(error.message)
        }
    }
}
