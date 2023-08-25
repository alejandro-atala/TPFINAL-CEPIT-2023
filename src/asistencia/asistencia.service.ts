import { Injectable } from '@nestjs/common';
import { Asistencia } from './entities/asistencia.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAsistenciaDto } from './dto/create-asistencia.dto';
import { UpdateAsistenciaDto } from './dto/update-asistencia.dto';

@Injectable()
export class AsistenciaService {
  constructor(
    @InjectRepository(Asistencia)
    private asistenciaRepository: Repository<Asistencia>,
  ) {}

  async create(createAsistenciaDto: CreateAsistenciaDto[]): Promise<void> {
    const asistenciaEntities: Asistencia[] = createAsistenciaDto.map(dto => {
      const asistencia = new Asistencia();
      asistencia.idAlumno = dto.idAlumno;
      asistencia.nombre = dto.nombre;
      asistencia.anio = dto.anio;
      asistencia.fecha = dto.fecha;
      asistencia.asistencia = dto.asistencia;
      return asistencia;
    });
    await this.asistenciaRepository.save(asistenciaEntities);
  }



  

  findAll() {
    return `This action returns all asistencia`;
  }

  findOne(id: number) {
    return `This action returns a #${id} asistencia`;
  }

  update(id: number, updateAsistenciaDto: UpdateAsistenciaDto) {
    return `This action updates a #${id} asistencia`;
  }

  remove(id: number) {
    return `This action removes a #${id} asistencia`;
  }
}
