import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';


@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

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
  
}
