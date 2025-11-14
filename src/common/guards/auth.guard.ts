import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/models/common/user.repository';

interface IPayload {
    _id: string
    email: string
}

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
        private readonly userRepository: UserRepository,
        private readonly reflector: Reflector,
    ) { }
    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {
        try {
            const request = context.switchToHttp().getRequest();

            const token = request.headers.authorization

            const payload = this.jwtService.verify<IPayload>(token, { secret: this.configService.get("jwt_secret") })

            const user = await this.userRepository.getById(payload._id)

            const isPublic = this.reflector.get("PUBLIC", context.getHandler());
            
            if (isPublic) {
                return true;
            }

            if (!user) {
                throw new UnauthorizedException("invalid token")
            }

            if (user.token != token) {
                throw new UnauthorizedException("invalid token")
            }

            request.user = user
            return true;
        } catch (error) {
            throw new InternalServerErrorException(error.message)
        }
    }
}
