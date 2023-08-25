import { Injectable } from '@nestjs/common';
import { CreateMateriaDto } from './dto/create-materia.dto';
import { UpdateMateriaDto } from './dto/update-materia.dto';
import { Materia } from './entities/materia.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MateriaService {
  constructor(
    @InjectRepository(Materia)
    private materiaRepository: Repository<Materia>,
  ) {}
  create(createMateriaDto: CreateMateriaDto) {
    return 'This action adds a new materia';
  }

  async findAll(): Promise<Materia[]> {
    return this.materiaRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} materia`;
  }

  update(id: number, updateMateriaDto: UpdateMateriaDto) {
    return `This action updates a #${id} materia`;
  }

  remove(id: number) {
    return `This action removes a #${id} materia`;
  }
}
