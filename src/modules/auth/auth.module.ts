import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserMongoModule } from 'src/shared/modules/user-mongo.module';
import { AuthFactoryService } from './factory';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [UserMongoModule],
  controllers: [AuthController],
  providers: [AuthService, AuthFactoryService, JwtService],
})
export class AuthModule { }
