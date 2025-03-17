
import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './decorators/public.decorator';
import { ConfigService } from '@nestjs/config';

// Tính ra phần này là mình copy code trên document của NestJS.
// Hiện tại mình cũng chưa cần phải hiểu nó lắm, cứ đi tổng quan đã
  
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector, private configService: ConfigService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {

      const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
          context.getHandler(),
          context.getClass(),
      ]);

      if(isPublic){
          // see this condition
          return true;
      }
  

      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
      if (!token) {
      throw new UnauthorizedException();
      }
      try {
      const payload = await this.jwtService.verifyAsync(
          token,
          {
          // secret: this.configService.get<string>('JWTSECRET')
          secret: jwtConstants.secret
          }
      );
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request['user'] = payload;
      } catch {
      throw new UnauthorizedException();
      }
      return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
