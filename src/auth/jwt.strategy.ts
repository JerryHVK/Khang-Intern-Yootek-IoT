
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
// import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  // cái này sẽ extract cái jwt token ra để check
  // vậy thì hàm validate sẽ đưa dữ liệu phân giải vào req.user
  // sau đó thì dữ liệu được gắn cho từng thuộc tính
  // mình đã từng gặp lỗi ở đâu nên mình hiểu
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // secretOrKey: jwtConstants.secret,
      secretOrKey: configService.get<string>('JWTSECRET', ''),
    });

    // console.log("hahaha: ", configService.get<string>('JWTSECRET'));

  }

  async validate(payload: any) {
    // return { id: payload.sub, email: payload.email, role: payload.role };
    return { id: payload.sub, role: payload.role };
  }
}
