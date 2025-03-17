import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/common/role.enum';
import { ROLES_KEY } from 'src/common/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    // console.log("here");
    if (!requiredRoles) {
      return true;  
    }
    // console.log("here");
    // console.log(requiredRoles);
    const { user } = context.switchToHttp().getRequest();

    // if (!user || !requiredRoles.includes(user.role)) {
    //   throw new ForbiddenException('Access denied'); // 403 Forbidden
    // }
    const a = requiredRoles.some((role) => user.role?.includes(role));
    // console.log(a);
    // console.log(user);
    return requiredRoles.some((role) => user.role?.includes(role));
  }
}