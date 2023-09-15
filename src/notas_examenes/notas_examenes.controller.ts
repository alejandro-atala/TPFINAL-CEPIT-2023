import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { NotasExamenesService } from './notas_examenes.service';
import { CreateNotasExameneDto } from './dto/create-notas_examenes.dto';
import { UpdateNotasExameneDto } from './dto/update-notas_examenes.dto';
import { ApiTags } from '@nestjs/swagger';



@ApiTags('notas-examenes')
@Controller('notas-examenes')
export class NotasExamenesController {
  constructor(private readonly notasExamenesService: NotasExamenesService) {}

  @Post()
  create(@Body() createNotasExameneDto: CreateNotasExameneDto) {
    return this.notasExamenesService.create(createNotasExameneDto);
  }
  @Get()
  findAll() {
    return this.notasExamenesService.findAll();
  }

  @Get(':id')
  findNotasExamenByAlumno(@Param('id', ParseIntPipe) idAlumno: number) {
    return this.notasExamenesService.findNotasExamenByAlumno(idAlumno);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNotasExameneDto: UpdateNotasExameneDto) {
    return this.notasExamenesService.update(+id, updateNotasExameneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notasExamenesService.remove(+id);
  }
}
