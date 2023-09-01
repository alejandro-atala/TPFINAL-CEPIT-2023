import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProfesorMateriasService } from './profesor-materias.service';
import { CreateProfesorMateriaDto } from './dto/create-profesor-materia.dto';
import { UpdateProfesorMateriaDto } from './dto/update-profesor-materia.dto';

@Controller('profesor-materias')
export class ProfesorMateriasController {
  constructor(private readonly profesorMateriasService: ProfesorMateriasService) {}

  @Post()
  create(@Body() createProfesorMateriaDto: CreateProfesorMateriaDto) {
    return this.profesorMateriasService.create(createProfesorMateriaDto);
  }

  @Get()
  findAll() {
    return this.profesorMateriasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.profesorMateriasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProfesorMateriaDto: UpdateProfesorMateriaDto) {
    return this.profesorMateriasService.update(+id, updateProfesorMateriaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.profesorMateriasService.remove(+id);
  }
}
