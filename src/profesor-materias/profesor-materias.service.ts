import { Injectable } from '@nestjs/common';
import { CreateProfesorMateriaDto } from './dto/create-profesor-materia.dto';
import { UpdateProfesorMateriaDto } from './dto/update-profesor-materia.dto';

@Injectable()
export class ProfesorMateriasService {
  create(createProfesorMateriaDto: CreateProfesorMateriaDto) {
    return 'This action adds a new profesorMateria';
  }

  findAll() {
    return `This action returns all profesorMaterias`;
  }

  findOne(id: number) {
    return `This action returns a #${id} profesorMateria`;
  }

  update(id: number, updateProfesorMateriaDto: UpdateProfesorMateriaDto) {
    return `This action updates a #${id} profesorMateria`;
  }

  remove(id: number) {
    return `This action removes a #${id} profesorMateria`;
  }
}
