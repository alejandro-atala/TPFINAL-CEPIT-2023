import { Controller, Get, Post, Body, Patch, Param, Delete, UnauthorizedException } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { CredencialesDto } from './dto/credenciales.dto';



@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) { }





  @Post('login')
  async iniciarSesion(@Body() credenciales: CredencialesDto) {
    try {
      const usuario = await this.usuarioService.buscarPorEmail(credenciales.email);

      if (!usuario) {
        throw new UnauthorizedException('Correo electrónico no registrado');
      }

      // Verificar la contraseña
      const contraseñaCoincide = await this.usuarioService.verificarContraseña(credenciales);

      if (!contraseñaCoincide) {
        throw new UnauthorizedException('Contraseña incorrecta');
      }

      if (usuario.tipo !== 'Alumno' && usuario.tipo !== 'Profesor') {

        throw new UnauthorizedException('Tipo de usuario no válido'); 
      }

      // Redirigir a diferentes rutas según el tipo de usuario
      if (usuario.tipo === 'Alumno' || usuario.tipo === 'Profesor') {
        //console.log(usuario.tipo, usuario.nombre, usuario.idUsuario)
        return { tipo: usuario.tipo, nombre: usuario.nombre, id: usuario.idUsuario };
      }



    } catch (error) {
      throw new UnauthorizedException('Error al iniciar sesión');
    }
  }


  @Post()
  async createRegistro(@Body() createUsuarioDto: CreateUsuarioDto) {
    try {
      const usuarioAsociado = await this.usuarioService.createUsuario(createUsuarioDto);
      return usuarioAsociado;
    } catch (error) {
      throw new Error(`Error al crear el usuario: ${error.message}`);
    }
  }

  // Otras rutas y controladores
}


