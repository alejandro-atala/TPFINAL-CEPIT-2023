import { Controller, Post, Body, Get, Param, Patch, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { AsistenciaService } from './asistencia.service';
import { CreateAsistenciaDto } from './dto/create-asistencia.dto';
import { UpdateAsistenciaDto } from './dto/update-asistencia.dto';
import { MiGuard } from 'src/auth/guard/guard';


@Controller('asistencia')
export class AsistenciaController {
  constructor(private readonly asistenciaService: AsistenciaService) {}

  
  @UseGuards(MiGuard)
  @Post()
  async create(@Body() createAsistenciaDto: CreateAsistenciaDto[]) {
    await this.asistenciaService.create(createAsistenciaDto);
  }


  @Get()
  findAll() {
    return this.asistenciaService.findAll();
  }

  @Get(':id')
  findAsistenciasByAlumno(@Param('id', ParseIntPipe) idAlumno: number) {
    return this.asistenciaService.findAsistenciasByAlumno(idAlumno);
  }
  
  

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAsistenciaDto: UpdateAsistenciaDto) {
    return this.asistenciaService.update(+id, updateAsistenciaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.asistenciaService.remove(+id);
  }
}
