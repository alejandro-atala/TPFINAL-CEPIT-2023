// src/materias/materias.controller.ts
import { Controller, Post, Get, Body } from '@nestjs/common';
import { MateriasService } from './materia.service';



@Controller('materias')
export class MateriasController {
  constructor(private readonly materiasService: MateriasService) {}

  @Post('guardar')
  async guardarMaterias(@Body() materiaData: any[]) {
    try {
      await this.materiasService.guardarMaterias(materiaData);
      return { message: 'Materias guardadas exitosamente' };
    } catch (error) {
      console.error('Error al guardar las materias', error);
      throw error; // Lanza el error original para que pueda ser manejado adecuadamente
    }
  }
  

  @Get()
  async getAllMaterias() {
    return this.materiasService.findAll();
  }
}
