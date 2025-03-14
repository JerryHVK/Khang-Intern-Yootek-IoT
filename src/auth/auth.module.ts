import { Module, SetMetadata } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/prisma.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
import { PassportModule } from '@nestjs/passport';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: {expiresIn: '1d'},
    }),
    PassportModule
  ],
  controllers: [AuthController],
  providers: [
    AuthService, 
    UserService, 
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    },
    JwtStrategy
  ],
  exports: [AuthService] //?????????? to do what?
})
export class AuthModule {}