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
    const nuevaMateria = new Materia();
    // Configura las propiedades de la nueva materia utilizando los datos de createMateriaDto
    if (createMateriaDto.nombre) {
      nuevaMateria.nombre = createMateriaDto.nombre;
    }
    // Continúa configurando otras propiedades según tus necesidades
    return await this.materiaRepository.save(nuevaMateria);
  }
  

  async findAll(): Promise<Materia[]> {
    return await this.materiaRepository.find();
  }

  async findOneByNombre(nombre: string): Promise<Materia | undefined> {
    return await this.materiaRepository.findOne({ where: { nombre } });
  }
  
  

  async updateById(id: number, updateMateriaDto: UpdateMateriaDto): Promise<Materia | undefined> {
    console.log(id)
    const materia = await this.materiaRepository.findOne({where: { idMateria:id } });
    console.log(materia)
    if (!materia) {
      return undefined; // La materia no existe
    }
    // Actualiza las propiedades de la materia utilizando los datos de updateMateriaDto
    if (updateMateriaDto.nombre) {
      materia.nombre = updateMateriaDto.nombre;
    }
    // Continúa actualizando otras propiedades según tus necesidades
    return await this.materiaRepository.save(materia);
  }
  


  async removeById(id: number): Promise<void> {
    await this.materiaRepository.delete(id);
  }
  
}
