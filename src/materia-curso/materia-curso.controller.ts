// src/materias/materias.controller.ts
import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { MateriasCursoService } from './materia-curso.service';
import { ApiTags } from '@nestjs/swagger';



@ApiTags('materias-curso')
@Controller('materias-curso')
export class MateriasCursoController {
  constructor(private readonly materiasCursoService: MateriasCursoService) {}

  @Post('guardar')
  async guardarMateriasCurso(@Body() materiaCursoData: any[]) {
    try {
      //console.log(materiaData);
      await this.materiasCursoService.guardarMateriasCurso(materiaCursoData);
      return { message: 'Materias guardadas exitosamente' };
    } catch (error) {
      console.error('Error al guardar las materias', error);
      throw error; // Lanza el error original para que pueda ser manejado adecuadamente
    }
  }
  
  @Get('/:cursoNombre')
  async getMateriasCursoByCursoNombre(@Param('cursoNombre') cursoNombre: string) {
    // Buscar las materias por nombre de curso
    const materias = await this.materiasCursoService.getMateriasCursoByCursoNombre(cursoNombre);
    return materias;
  }

  @Get()
  async getAllMaterias() {
    return this.materiasCursoService.findAll();
  }
} 