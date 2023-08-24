// alumno.service.ts
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Alumno } from './entities/alumno.entity';
import { CreateAlumnoDto } from './dto/create-alumno.dto';
import { UpdateAlumnoDto } from './dto/update-alumno.dto';

@Injectable()
export class AlumnoService {
  constructor(
    @InjectRepository(Alumno)
    private alumnoRepository: Repository<Alumno>,
  ) {}

  async getAlumnosPorAnio(anio: string): Promise<Alumno[]> {
    return this.alumnoRepository
      .createQueryBuilder('alumno')
      .innerJoinAndSelect('alumno.curso', 'curso', 'curso.anio = :anio', { anio })
      .getMany();
  }

  async create(createAlumnoDto: CreateAlumnoDto): Promise<Alumno> {
    const newAlumno = this.alumnoRepository.create(createAlumnoDto);
    return this.alumnoRepository.save(newAlumno);
  }

  async getAllAlumnos(): Promise<Alumno[]> {
    return this.alumnoRepository.find();
  }

  async findOne(id: number): Promise<Alumno | undefined> {
    try {
      return await this.alumnoRepository.findOne({ where: { idAlumno: id } });
    } catch (error) {
      // Handle error, e.g., log it
      console.error(error);
      throw new Error(`Could not find alumno with id: ${id}`);
    }
  }

  async update(id: number, updateAlumnoDto: UpdateAlumnoDto): Promise<Alumno | undefined> {
    try {
      await this.alumnoRepository.update(id, updateAlumnoDto);
      return this.alumnoRepository.findOne({ where: { idAlumno: id } });
    } catch (error) {
      // Handle error, e.g., log it
      console.error(error);
      throw new Error(`Could not update alumno with id: ${id}`);
    }
  }
  async remove(id: number): Promise<void> {
    await this.alumnoRepository.delete(id);
  }
}
