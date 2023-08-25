import { Controller, Get, Post, Body, Patch, Param, Delete, UnauthorizedException} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { CredencialesDto } from './dto/credenciales.dto';



@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) { }

  // @Post()
  // create(@Body() createUsuarioDto: CreateUsuarioDto) {
  //   return this.usuarioService.createRegistro(createUsuarioDto);
  // }

  @Get()
  findAll() {
    return this.usuarioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuarioService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuarioService.update(+id, updateUsuarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuarioService.remove(+id);
  }

  @Post()
  async createRegistro(@Body() createUsuarioDto: CreateUsuarioDto) {
    try {
      const nuevoUsuario = await this.usuarioService.createRegistro(createUsuarioDto);
      return nuevoUsuario;
    } catch (error) {
      throw new Error('Error al crear el usuario');
    }
  }

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
        return { tipo: usuario.tipo, nombre: usuario.nombre, id : usuario.idUsuario};
      } 



    } catch (error) {
      throw new UnauthorizedException('Error al iniciar sesión');
    }
  }


}
