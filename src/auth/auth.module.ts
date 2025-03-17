import { Module, SetMetadata } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/prisma.service';
import { APP_GUARD } from '@nestjs/core';
import { PassportModule } from '@nestjs/passport';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';


@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: {expiresIn: '1d'},
    }),
    PassportModule,
    ConfigModule
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
  exports: [AuthService] //-> Export ra cho người khác dùng nữa chứ mày, 
  //export ra dưới dạng service, có vẻ là sẽ đỡ phải import cả module vào module khác
})
export class AuthModule {}