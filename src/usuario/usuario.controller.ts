import { Controller, Post, Body, UnauthorizedException, Get, Put, Param, Delete, BadRequestException } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { CredencialesDto } from './dto/credenciales.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { ApiTags } from '@nestjs/swagger';



@ApiTags('usuario')
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
    const user = Array.isArray(createUsuarioDto)
      ? createUsuarioDto[0]
      : createUsuarioDto;
    
    console.log(user);
  
    // Verifica si el tipo es Profesor y curso no es un array
    if (user.tipo === 'Profesor' && !Array.isArray(user.curso)) {
      // Convierte el valor de curso en un array
      user.curso = [user.curso];
    }
  
    try {
      const usuarioAsociado = await this.usuarioService.createRegistro(createUsuarioDto);
      return usuarioAsociado;
    } catch (error) {
      throw new Error(`Error al crear el usuario: ${error.message}`);
    }
  }
  

  @Get()
  async findAll() {
    return this.usuarioService.findAll();
  }

  @Get('email/:email') // Use 'email/:email' to define a route parameter 'email'
  async buscarPorEmail(@Param('email') email: string) {
    return this.usuarioService.buscarPorEmail(email);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateUsuarioDto: UpdateUsuarioDto) {

    return this.usuarioService.update(id, updateUsuarioDto);
  }

  @Delete(':id')
  async eliminarRegistro(@Param('id') id: string): Promise<void> {
    const registroId = parseInt(id, 10);
    await this.usuarioService.eliminarRegistro(registroId);
  }

  @Post('resetpassword/email')
  async resetPassword(
    @Body('email') email: string,
    @Body() newPasswordData: { newPassword: string }
  ) {
   console.log(newPasswordData)
    try {
      // Llama a la función que maneja el restablecimiento de contraseña en el servicio
      await this.usuarioService.resetPassword(email, newPasswordData.newPassword);
      return { message: 'Contraseña actualizada con éxito.' };
    } catch (error) {
      console.error('Error al restablecer la contraseña:', error);
      throw new BadRequestException('No se pudo restablecer la contraseña.');
    }
  }
  


  @Post('resetpassword/token')
  async validarToken(@Body('token') token: string): Promise<{ message: string }> {
    console.log("controller",token);
    try {
      // Llama a la función que maneja la validación del token en el servicio
      const tokenValido = await this.usuarioService.validarToken(token);

      if (tokenValido) {
        return { message: 'Token activo.' };
      } else {
        throw new BadRequestException('Token expirado o no válido');
      }
    } catch (error) {
      console.error('Error al validar el token:', error);
      throw new BadRequestException('No se pudo verificar el token');
    }
  }

  }
