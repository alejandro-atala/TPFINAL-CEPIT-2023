import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class MiGuard implements CanActivate {

  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization;
    console.log("MiGuard")
    if (!token) {
      throw new UnauthorizedException('Token no proporcionado');
    }

    // Decodificar el token para verificar la fecha de expiración
    try {
      const decodedToken = this.jwtService.verify(token, { ignoreExpiration: false });
console.log(decodedToken);
      // Verificar la fecha de expiración
      const expirationDate = new Date(decodedToken.exp * 1000); // La fecha de expiración en segundos
      if (expirationDate <= new Date()) {
        throw new UnauthorizedException('Token expirado');
      }

      // Otra lógica de autorización personalizada aquí...

      return true; // Permitir la solicitud si todo está correcto
    } catch (error) {
      throw new UnauthorizedException('Token no válido');
    }
  }
}
