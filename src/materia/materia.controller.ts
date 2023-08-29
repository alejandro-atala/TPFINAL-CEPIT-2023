// src/materias/materias.controller.ts
import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { MateriasService } from './materia.service';



@Controller('materias')
export class MateriasController {
  constructor(private readonly materiasService: MateriasService) {}

  @Post('guardar')
  async guardarMaterias(@Body() materiaData: any[]) {
    try {
      //console.log(materiaData);
      await this.materiasService.guardarMaterias(materiaData);
      return { message: 'Materias guardadas exitosamente' };
    } catch (error) {
      console.error('Error al guardar las materias', error);
      throw error; // Lanza el error original para que pueda ser manejado adecuadamente
    }
  }
  
  @Get('/:cursoNombre')
  async getMateriasByCursoNombre(@Param('cursoNombre') cursoNombre: string) {
    // Buscar las materias por nombre de curso
    const materias = await this.materiasService.getMateriasByCursoNombre(cursoNombre);
    return materias;
  }

  @Get()
  async getAllMaterias() {
    return this.materiasService.findAll();
  }
}