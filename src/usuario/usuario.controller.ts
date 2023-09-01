import { Controller, Get, Post, Body, Patch, Param, Delete, UnauthorizedException } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { CredencialesDto } from './dto/credenciales.dto';
import { Profesor } from 'src/profesor/entities/profesor.entity';
import { Alumno } from 'src/alumno/entities/alumno.entity';



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
      const nuevoUsuario = await this.usuarioService.createUsuario(createUsuarioDto);
      let usuarioAsociado;
     console.log(createUsuarioDto)
     console.log(nuevoUsuario)
      // Verificar el tipo de usuario y asociarlo a la tabla correspondiente
      if (createUsuarioDto.tipo === 'Alumno') {
        const alumno = new Alumno();
        console.log(nuevoUsuario.curso)
        alumno.nombre = nuevoUsuario.nombre;
        alumno.usuarioId = nuevoUsuario.idUsuario;
        alumno.cursoIdCurso = nuevoUsuario.curso;
       
        usuarioAsociado = await this.usuarioService.asociarAlumno(alumno);
      } 

      else if (createUsuarioDto.tipo === 'Profesor') {

        const profesor = new Profesor(); 


        profesor.nombre = nuevoUsuario.nombre;
      profesor.usuarioId = nuevoUsuario.idUsuario;

        usuarioAsociado = await this.usuarioService.asociarProfesor(profesor);
        console.log(usuarioAsociado)
      }
      return usuarioAsociado;
    } catch (error) {
      // Lanza una excepción personalizada con un mensaje informativo
      throw new Error(`Error al crear el usuario: ${error.message}`);
  // Otras rutas y controladores
}

}}
  