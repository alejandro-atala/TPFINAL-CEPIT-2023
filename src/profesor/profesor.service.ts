import { Injectable } from '@nestjs/common';
import { CreateProfesorDto } from './dto/create-profesor.dto';
import { UpdateProfesorDto } from './dto/update-profesor.dto';
import { Profesor } from './entities/profesor.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProfesorService {
  constructor(
    @InjectRepository(Profesor)
    private profesorRepository: Repository<Profesor>,
  ) {}

  
  async createProfesor(nombre: string, curso: number): Promise<Profesor> {
    const nuevoProfesor = new Profesor();
    nuevoProfesor.nombre = nombre;
    nuevoProfesor.usuarioId = curso;
    
    return this.profesorRepository.save(nuevoProfesor);
  }

  async findAll(): Promise<Profesor[]> {
    return this.profesorRepository.find();
  }

  async findProfesorById(id): Promise<Profesor | null> {
    return this.profesorRepository.findOne(id);
  }
}
