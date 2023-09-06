import { Controller, Post, Body, UnauthorizedException, Get, Param, Put, Delete } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { CredencialesDto } from './dto/credenciales.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

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
   
    try {
      console.log("post");
      const usuarioAsociado = await this.usuarioService.createRegistro(
        createUsuarioDto,
      );
      return usuarioAsociado;
    } catch (error) {
      throw new Error(`Error al crear el usuario: ${error.message}`);
    }
  }

  @Get()
  async findAll() {
    return this.usuarioService.findAll();
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


}
