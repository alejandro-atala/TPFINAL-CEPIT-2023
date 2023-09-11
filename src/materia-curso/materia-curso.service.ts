// src/materias/materias.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MateriaCurso } from './entities/materia-curso.entity';
import { CreateMateriaCursoDto } from './dto/create-materia-curso.dto';

@Injectable()
export class MateriasCursoService {
  constructor(
    @InjectRepository(MateriaCurso)
    private materiasCursoRepository: Repository<MateriaCurso>,
  ) {}

  async guardarMateriasCurso(materiaCursoData: CreateMateriaCursoDto[]) {

    const existingMateriasCurso = await this.getMateriasCursoByCursoNombre(materiaCursoData[0].anio);

    for (const data of materiaCursoData) {
      const { materia, diaHora, anio } = data;

      const existingMateria = existingMateriasCurso.find(m => m.diaHora === diaHora);
      
      if (existingMateria) {
        // Update existing materia
        existingMateria.materia = materia;
        await this.materiasCursoRepository.save(existingMateria);
      } else {
        // Create new materia
        const nuevaMateria = this.materiasCursoRepository.create({
          materia: materia,
          diaHora: diaHora,
          anio: anio
        });

        await this.materiasCursoRepository.save(nuevaMateria);
      }
    }
  }

  

async getMateriasCursoByCursoNombre(cursoNombre: string): Promise<MateriaCurso[]> {
  // Implementa la lógica para buscar las materias por nombre de curso
  // Puedes usar el método del repositorio que mejor se adapte a tu caso
  const materias = await this.materiasCursoRepository.find({where:{ anio: cursoNombre }});
  return materias;
}



async findAll(): Promise<MateriaCurso[]> {
  return this.materiasCursoRepository.find();
}
}


