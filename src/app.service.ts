import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './user/dto/create-user-dto';
import { UserService } from './user/user.service';

@Injectable()
export class AppService {
  constructor(private userService: UserService){}

  getHello() {
    return {message: "Hello NestJS!"};
  }

  // login(email: string, password: string){
  //   // login logic here
  //   // need to return jwt token
  // }

  // signup(createUserDTO: CreateUserDTO){
  //   // signup logic here
  //   // need to return jwt token
  //   return this.userService.createUser(createUserDTO);
  // }
}
