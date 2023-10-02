import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Aviso } from './entities/aviso.entity';
import { CreateAvisoDto } from './dto/create-aviso.dto';
import { UpdateAvisoDto } from './dto/update-curso.dto'; 

@Injectable()
export class AvisosService {
  constructor(
    @InjectRepository(Aviso)
    private readonly avisoRepository: Repository<Aviso>,
  ) {}

  async create(createAvisoDto: CreateAvisoDto): Promise<Aviso> {
    try {
      // Agrega un console.log para verificar el contenido de createAvisoDto
      console.log('createAvisoDto:', createAvisoDto);

      const nuevoAviso = new Aviso();
      nuevoAviso.contenido = createAvisoDto.contenido;
      nuevoAviso.curso = createAvisoDto.curso; 
      nuevoAviso.profesorIdProfesor = createAvisoDto.profesorIdProfesor; 
      nuevoAviso.nombreProfesor = createAvisoDto.nombreProfesor; 

      return await this.avisoRepository.save(nuevoAviso);
    } catch (error) {
      console.error('Error en create:', error);
      throw error;
    }
  }

  async findAll(): Promise<Aviso[]> {
    return await this.avisoRepository.find();
  }

  async findOneByCurso(id: number): Promise<Aviso | undefined> {
    return await this.avisoRepository.findOne({ where: { idAviso: id } });
  }

  async updateById(id: number, updateAvisoDto: UpdateAvisoDto): Promise<Aviso | undefined> {
    const aviso = await this.avisoRepository.findOne({ where: { idAviso: id } });

    if (!aviso) {
      throw new NotFoundException(`Aviso con ID ${id} no encontrado`);
    }

    aviso.contenido = updateAvisoDto.contenido;

    return await this.avisoRepository.save(aviso);
  }

  async removeById(id: number): Promise<void> {
    await this.avisoRepository.delete(id);
  }
}