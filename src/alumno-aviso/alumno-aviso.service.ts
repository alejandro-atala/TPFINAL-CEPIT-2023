import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AlumnoAviso } from './entities/alumno-aviso.entity';
import { CreateAlumnoAvisoDto } from './dto/create-alumno-aviso.dto';

@Injectable()
export class AlumnoAvisoService {
  constructor(
    @InjectRepository(AlumnoAviso)
    private readonly alumnoAvisoRepository: Repository<AlumnoAviso>,
  ) {}

  async create(createAlumnoAvisoDto: CreateAlumnoAvisoDto): Promise<void> {
    try {
      const { avisoIdAviso, alumnoIdAlumno } = createAlumnoAvisoDto;
      const alumnoAviso = new AlumnoAviso();
      alumnoAviso.avisoIdAviso = avisoIdAviso;
      alumnoAviso.alumnoIdAlumno = alumnoIdAlumno;
      await this.alumnoAvisoRepository.save(alumnoAviso);
    } catch (error) {
      throw new BadRequestException('Error al crear el registro en la tabla `alumno_aviso`');
    }
  }

  async verificarExistencia(idAviso: number, idAlumno: number): Promise<boolean> {
    const existeAviso = await this.alumnoAvisoRepository.findOne({
      where: {
        avisoIdAviso: idAviso,
        alumnoIdAlumno: idAlumno,
      },
    });

    return !!existeAviso;
  }

  async marcarAvisosComoLeidos(idAviso: number, idAlumno: number): Promise<void> {
    try {
      const alumnoAviso = await this.alumnoAvisoRepository.findOne({
        where: {
          avisoIdAviso: idAviso,
          alumnoIdAlumno: idAlumno,
        },
      });
  
      if (alumnoAviso) {
        alumnoAviso.leido = true;
        await this.alumnoAvisoRepository.save(alumnoAviso);
      }
    } catch (error) {
      throw new BadRequestException('Error al marcar el aviso como leído');
    }
  }
}