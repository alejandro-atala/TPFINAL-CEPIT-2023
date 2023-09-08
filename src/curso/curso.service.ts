import { Injectable, NotFoundException } from '@nestjs/common';
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

  async create(createCursoDto: CreateCursoDto): Promise<Curso> {
    const nuevoCurso = this.cursoRepository.create(createCursoDto);
    return this.cursoRepository.save(nuevoCurso);
  }

  async getAllCursos(): Promise<Curso[]> {
    return this.cursoRepository.find();
  }

  async findOne(id: number): Promise<Curso> {
    const curso = await this.cursoRepository.findOne({where: {idCurso: id}});
    if (!curso) {
      throw new NotFoundException(`Curso con ID ${id} no encontrado.`);
    }
    return curso;
  }

  async update(id: number, updateCursoDto: UpdateCursoDto): Promise<Curso> {
    console.log(id)
    await this.findOne(id); // Verificar si el curso existe
    await this.cursoRepository.update(id, updateCursoDto);
    return this.cursoRepository.findOne({where: {idCurso: id}});
  }

  async remove(id: number): Promise<void> {
    const curso = await this.findOne(id); 
   // console.log(curso)// Verificar si el curso existe
    if (!curso) {
      throw new Error(`El curso con ID ${id} no existe.`);
    }
    await this.cursoRepository.remove(curso);
  }
}
