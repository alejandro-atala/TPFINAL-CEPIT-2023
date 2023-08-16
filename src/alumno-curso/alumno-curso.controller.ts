import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AlumnoCursoService } from './alumno-curso.service';
import { CreateAlumnoCursoDto } from './dto/create-alumno-curso.dto';
import { UpdateAlumnoCursoDto } from './dto/update-alumno-curso.dto';

@Controller('alumno-curso')
export class AlumnoCursoController {
  constructor(private readonly alumnoCursoService: AlumnoCursoService) {}

  @Post()
  create(@Body() createAlumnoCursoDto: CreateAlumnoCursoDto) {
    return this.alumnoCursoService.create(createAlumnoCursoDto);
  }

  @Get()
  findAll() {
    return this.alumnoCursoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.alumnoCursoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAlumnoCursoDto: UpdateAlumnoCursoDto) {
    return this.alumnoCursoService.update(+id, updateAlumnoCursoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.alumnoCursoService.remove(+id);
  }
}
