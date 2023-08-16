import { Injectable } from '@nestjs/common';
import { CreateAlumnoCursoDto } from './dto/create-alumno-curso.dto';
import { UpdateAlumnoCursoDto } from './dto/update-alumno-curso.dto';

@Injectable()
export class AlumnoCursoService {
  create(createAlumnoCursoDto: CreateAlumnoCursoDto) {
    return 'This action adds a new alumnoCurso';
  }

  findAll() {
    return `This action returns all alumnoCurso`;
  }

  findOne(id: number) {
    return `This action returns a #${id} alumnoCurso`;
  }

  update(id: number, updateAlumnoCursoDto: UpdateAlumnoCursoDto) {
    return `This action updates a #${id} alumnoCurso`;
  }

  remove(id: number) {
    return `This action removes a #${id} alumnoCurso`;
  }
}
