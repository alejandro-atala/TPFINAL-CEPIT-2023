
import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ProfesorService } from './profesor.service';
import { UpdateProfesorDto } from './dto/update-profesor.dto';


@Controller('profesor')
export class ProfesorController {
  constructor(private readonly profesorService: ProfesorService) {}

  @Get()
  async getAllProfesores() {
    const alumnos = await this.profesorService.getAllProfesores();
    return alumnos;
  }

  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.profesorService.findOne(+id);
  }

  
  @Get('usuario/:id')
  findAlumnoByUsuario(@Param('id',ParseIntPipe) id: number) {

    return this.profesorService.findProfesorByUsuario(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProfesorDto: UpdateProfesorDto) {
    return this.profesorService.update(+id, updateProfesorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.profesorService.remove(+id);
  }


}