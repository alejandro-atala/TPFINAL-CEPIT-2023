import { Injectable } from '@nestjs/common';
import { Asistencia } from './entities/asistencia.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateAsistenciaDto } from './dto/create-asistencia.dto';
import { UpdateAsistenciaDto } from './dto/update-asistencia.dto';

@Injectable()
export class AsistenciaService {
  constructor(
    @InjectRepository(Asistencia)
    private asistenciaRepository: Repository<Asistencia>,
  ) {}

  async create(createAsistenciaDto: CreateAsistenciaDto[]): Promise<void> {
    console.log(createAsistenciaDto)
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


  async findAsistenciasByAlumno(idAlumno: number): Promise<Asistencia[]> {
    return this.asistenciaRepository.find({
      where: { idAlumno: idAlumno },
    });
  }
  
  
  

  update(id: number, updateAsistenciaDto: UpdateAsistenciaDto) {
    return `This action updates a #${id} asistencia`;
  }

  remove(id: number) {
    return `This action removes a #${id} asistencia`;
  }
}
