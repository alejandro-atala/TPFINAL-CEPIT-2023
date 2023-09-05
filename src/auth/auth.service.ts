import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  // async generateToken(user: any): Promise<string> {
  //   const payload = {
  //     usuario: user.idUsuario,
  //     email: user.email,
  //   };
  //   return this.jwtService.sign(payload);
  // }
}
