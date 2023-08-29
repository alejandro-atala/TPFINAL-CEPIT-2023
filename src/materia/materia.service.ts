// src/materias/materias.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Materia } from './entities/materia.entity';
import { CreateMateriaDto } from './dto/create-materia.dto';

@Injectable()
export class MateriasService {
  constructor(
    @InjectRepository(Materia)
    private materiasRepository: Repository<Materia>,
  ) {}

  async guardarMaterias(materiaData: CreateMateriaDto[]) {
    console.log(materiaData);
    const existingMaterias = await this.getMateriasByCursoNombre(materiaData[0].anio);

    for (const data of materiaData) {
      const { materia, diaHora, anio } = data;

      const existingMateria = existingMaterias.find(m => m.diaHora === diaHora);
      
      if (existingMateria) {
        // Update existing materia
        existingMateria.materia = materia;
        await this.materiasRepository.save(existingMateria);
      } else {
        // Create new materia
        const nuevaMateria = this.materiasRepository.create({
          materia: materia,
          diaHora: diaHora,
          anio: anio
        });

        await this.materiasRepository.save(nuevaMateria);
      }
    }
  }

  

async getMateriasByCursoNombre(cursoNombre: string): Promise<Materia[]> {
  // Implementa la lógica para buscar las materias por nombre de curso
  // Puedes usar el método del repositorio que mejor se adapte a tu caso
  const materias = await this.materiasRepository.find({where:{ anio: cursoNombre }});
  return materias;
}



async findAll(): Promise<Materia[]> {
  return this.materiasRepository.find();
}
}