import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Materia } from './entities/materia.entity';  // Importa la entidad Materia
import { UpdateMateriaDto } from './dto/update-materia.dto';
import { CreateMateriaDto } from './dto/create-materia.dto';

@Injectable()
export class MateriaService {
  constructor(
    @InjectRepository(Materia)
    private readonly materiaRepository: Repository<Materia>,
  ) {}

  async create(createMateriaDto: CreateMateriaDto): Promise<Materia> {
    const materia = new Materia();
    // Configura las propiedades de la materia utilizando los datos de createMateriaDto
    return await this.materiaRepository.save(materia);
  }

  async findAll(): Promise<Materia[]> {
    return await this.materiaRepository.find();
  }

  async findOneByNombre(nombre: string): Promise<Materia | undefined> {
    return await this.materiaRepository.findOne({ where: { nombre } });
  }
  
  

  async update(nombre:string, updateMateriaDto: UpdateMateriaDto): Promise<Materia | undefined> {
    const materia = await this.materiaRepository.findOne({ where: { nombre } });
    if (!materia) {
      return undefined;
    }
    // Actualiza las propiedades de la materia utilizando los datos de updateMateriaDto
    return await this.materiaRepository.save(materia);
  }

  async remove(id: number): Promise<void> {
    await this.materiaRepository.delete(id);
  }
}
