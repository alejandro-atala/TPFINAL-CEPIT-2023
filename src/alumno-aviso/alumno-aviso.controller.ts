import { Controller, Post, Body, Param, Get, Put } from '@nestjs/common';
import { CreateAlumnoAvisoDto } from './dto/create-alumno-aviso.dto';
import { AlumnoAvisoService } from './alumno-aviso.service';

@Controller('alumno-aviso')
export class AlumnoAvisoController {
  constructor(private readonly alumnoAvisoService: AlumnoAvisoService) {}

  @Post()
  async create(@Body() createAlumnoAvisoDto: CreateAlumnoAvisoDto): Promise<void> {
    await this.alumnoAvisoService.create(createAlumnoAvisoDto);
  }

  @Get('existe/:idAviso/:idAlumno')
  async verificarExistencia(@Param('idAviso') idAviso: number, @Param('idAlumno') idAlumno: number): Promise<boolean> {
    const existeAviso = await this.alumnoAvisoService.verificarExistencia(idAviso, idAlumno);
    return existeAviso;
  }

  @Put('marcar-leidos/:idAviso/:idAlumno')
  async marcarAvisosComoLeidos(
    @Param('idAviso') idAviso: number,
    @Param('idAlumno') idAlumno: number,
  ): Promise<void> {
    await this.alumnoAvisoService.marcarAvisosComoLeidos(idAviso, idAlumno);
  }
}