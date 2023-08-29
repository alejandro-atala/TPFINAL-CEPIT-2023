// src/materias/materias.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Materia } from './entities/materia.entity';

@Injectable()
export class MateriasService {
  constructor(
    @InjectRepository(Materia)
    private materiasRepository: Repository<Materia>,
  ) {}

  async guardarMaterias(materiaData: any[]) {
    console.log(materiaData);
  try {
    for (const data of materiaData) {
      const { materia, diaHora, anio } = data;

      const materiaExistente = await this.materiasRepository.findOne({ where : {diaHora} });

      if (materiaExistente) {
        // Si la materia ya existe, actualiza el nombre
        materiaExistente.materia = materia;
        await this.materiasRepository.save(materiaExistente);
      } else {
        // Si no existe, crea un nuevo registro
        const nuevaMateria = this.materiasRepository.create({
          materia: materia,
          diaHora: diaHora,
          anio: anio
         
        }); 
        await this.materiasRepository.save(nuevaMateria);
      }
    }
  } catch (error) {
    console.error('Error al guardar las materias', error);
    throw new Error('Error al guardar las materias');
  }
}

  

  async findAll(): Promise<Materia[]> {
    return this.materiasRepository.find();
  }
}
