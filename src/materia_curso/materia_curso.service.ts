import { Injectable } from '@nestjs/common';
import { CreateMateriaCursoDto } from './dto/create-materia_curso.dto';
import { UpdateMateriaCursoDto } from './dto/update-materia_curso.dto';

@Injectable()
export class MateriaCursoService {
  create(createMateriaCursoDto: CreateMateriaCursoDto) {
    return 'This action adds a new materiaCurso';
  }

  findAll() {
    return `This action returns all materiaCurso`;
  }

  findOne(id: number) {
    return `This action returns a #${id} materiaCurso`;
  }

  update(id: number, updateMateriaCursoDto: UpdateMateriaCursoDto) {
    return `This action updates a #${id} materiaCurso`;
  }

  remove(id: number) {
    return `This action removes a #${id} materiaCurso`;
  }
}
