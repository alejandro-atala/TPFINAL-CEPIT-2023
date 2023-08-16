import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MateriaCursoService } from './materia_curso.service';
import { CreateMateriaCursoDto } from './dto/create-materia_curso.dto';
import { UpdateMateriaCursoDto } from './dto/update-materia_curso.dto';

@Controller('materia-curso')
export class MateriaCursoController {
  constructor(private readonly materiaCursoService: MateriaCursoService) {}

  @Post()
  create(@Body() createMateriaCursoDto: CreateMateriaCursoDto) {
    return this.materiaCursoService.create(createMateriaCursoDto);
  }

  @Get()
  findAll() {
    return this.materiaCursoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.materiaCursoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMateriaCursoDto: UpdateMateriaCursoDto) {
    return this.materiaCursoService.update(+id, updateMateriaCursoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.materiaCursoService.remove(+id);
  }
}
