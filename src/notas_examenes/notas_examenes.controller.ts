import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NotasExamenesService } from './notas_examenes.service';
import { CreateNotasExameneDto } from './dto/create-notas_examene.dto';
import { UpdateNotasExameneDto } from './dto/update-notas_examene.dto';

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
  findOne(@Param('id') id: string) {
    return this.notasExamenesService.findOne(+id);
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
