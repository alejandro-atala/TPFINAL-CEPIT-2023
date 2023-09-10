import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { CredencialesDto } from './dto/credenciales.dto';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post('login')
  async iniciarSesion(@Body() credenciales: CredencialesDto) {
    try {
      const response = await this.usuarioService.iniciarSesion(credenciales);
   
      return response;
    } catch (error) {
      throw new UnauthorizedException('Error al iniciar sesión');
    }
  }

  @Post()
  async createRegistro(@Body() createUsuarioDto: CreateUsuarioDto) {
   
    // Verifica si el tipo es Profesor y curso no es un array
    if (createUsuarioDto.tipo === 'Profesor' && 
    !Array.isArray(createUsuarioDto.curso)) {
      // Convierte el valor de curso en un array
      createUsuarioDto.curso = [createUsuarioDto.curso];
    }

    try {
  
      const usuarioAsociado = await this.usuarioService.createRegistro(
        createUsuarioDto,
      );
      return usuarioAsociado;
    } catch (error) {
      throw new Error(`Error al crear el usuario: ${error.message}`);
    }
  }
  }

