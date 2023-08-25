import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Curso } from './entities/curso.entity';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';

@Injectable()
export class CursoService {
  constructor(
    @InjectRepository(Curso) private cursoRepository: Repository<Curso>,
  ) {}
  async getAnios(): Promise<Curso[]> {
    return this.cursoRepository
      .createQueryBuilder('curso')
      .select('DISTINCT curso.anio', 'anio') // Selecciona aÃ±os Ãºnicos
      .getRawMany();
  }
  create(createCursoDto: CreateCursoDto) {
    return 'This action adds a new curso';
  }


  findAll() {
    return `This action returns all curso`;
  }

  findOne(id: number) {
    return `This action returns a #${id} curso`;
  }

  update(id: number, updateCursoDto: UpdateCursoDto) {
    return `This action updates a #${id} curso`;
  }

  remove(id: number) {
    return `This action removes a #${id} curso`;
  }
}
