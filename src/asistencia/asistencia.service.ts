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

  async create(asistencias: CreateAsistenciaDto[]) {
    const asistenciaEntities = asistencias.map((asistenciaDto) => this.convertToAsistenciaEntity(asistenciaDto));
    return await this.asistenciaRepository.save(asistenciaEntities);
  }

  private convertToAsistenciaEntity(createAsistenciaDto: CreateAsistenciaDto): Asistencia {
    const asistencia = new Asistencia();
    asistencia.alumno = createAsistenciaDto.alumno;
    asistencia.fecha = createAsistenciaDto.fecha;
    asistencia.asistencia = createAsistenciaDto.asistencia;
    return asistencia;
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
