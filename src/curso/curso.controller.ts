import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { CursoService } from './curso.service';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';

@Controller('curso')
export class CursoController {
  constructor(private readonly cursoService: CursoService) {}
  @Get('anios')
  async getAnios() {
    const anios = await this.cursoService.getAnios();
    return anios.map(curso => curso.anio); // Extrae solo los valores de "anio"
  }

  @Post()
  create(@Body() createCursoDto: CreateCursoDto) {
    return this.cursoService.create(createCursoDto);
  }

  @Get()
  async getAllCursos() {
    const cursos = await this.cursoService.getAllCursos();
    return cursos;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cursoService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateCursoDto: UpdateCursoDto) {
    console.log(id)
    return this.cursoService.update(id, updateCursoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    console.log(id);
    return this.cursoService.remove(id);
  }
}
