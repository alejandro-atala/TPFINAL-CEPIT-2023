import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @Post('login')
  // async login(@Body() credentials: any) {

  //   const token = await this.authService.generateToken(credentials);
  //   console.log(token)
  //   return { token };
  // }
}
