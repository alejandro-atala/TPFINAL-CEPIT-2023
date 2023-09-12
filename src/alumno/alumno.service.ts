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
      .innerJoinAndSelect('alumno.cursoIdCurso', 'curso', 'curso.anio = :anio', { anio })
      .getMany();
  }

  async createAlumno(nombre: string, cursoId: number): Promise<Alumno> {
    const nuevoAlumno = new Alumno();
    nuevoAlumno.nombre = nombre;
    //nuevoAlumno.curso = cursoId;
    nuevoAlumno.cursoIdCurso = cursoId;
    return this.alumnoRepository.save(nuevoAlumno);
  }

  async findAllAlumnos(): Promise<Alumno[]> {
    return this.alumnoRepository.find();
  }

  async findAlumnoById(id): Promise<Alumno | null> {
    return this.alumnoRepository.findOne(id);
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


  async findAlumnoByUsuario(id: number): Promise<Alumno > {
    try {
      console.log(id)
      const alumno = await this.alumnoRepository.findOne({ where: { usuarioId: id } });
      console.log(alumno)
      return alumno;

    } catch (error) {
      console.error(error);
      throw new Error(`Could not find alumno with usuarioId: ${id}`);
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
