import { Controller, Get, Post, UseGuards, Request, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './auth/decorators/public.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get('/hello')
  getHello() {
    return this.appService.getHello();
  }

  // @Public()
  // @Post('/login')
  // async login(@Request() req){
  //   return this.appService.login(req.body.email, req.body.password);
  // }

  // @Public()
  // @Post('/signup')
  // async signup(@Body() createUserDTO: CreateUserDTO){
  //   return this.appService.signup(createUserDTO);
  // }
}
