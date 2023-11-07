// solicitudes.service.ts (Update your service)
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Solicitude } from './entities/solicitude.entity';
import { CreateSolicitudeDto } from './dto/create-solicitude.dto';

@Injectable()
export class SolicitudesService {
  constructor(
    @InjectRepository(Solicitude)
    private solicitudesRepository: Repository<Solicitude>
  ){ }

  async create(createSolicitudeDto: CreateSolicitudeDto) {
    const solicitud = new Solicitude(); // Create a new instance of the entity
    solicitud.nombre = createSolicitudeDto.nombre;
    solicitud.dni = createSolicitudeDto.dni;
    solicitud.fechaNac = createSolicitudeDto.fechaNac;
    solicitud.direccion = createSolicitudeDto.direccion;
    solicitud.telefono = createSolicitudeDto.telefono;
    solicitud.email = createSolicitudeDto.email;
    solicitud.password = createSolicitudeDto.password;
    solicitud.tipo = createSolicitudeDto.tipo;
    solicitud.curso = createSolicitudeDto.curso;
  
    return await this.solicitudesRepository.save(solicitud); // Use await to ensure the save operation is completed
  }

  async findAll() {
    return this.solicitudesRepository.find();
  }


  async delete(id: number) {

    const userToDelete = await this.solicitudesRepository.findOne({where: {idUsuario: id}});

    if (!userToDelete) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    await this.solicitudesRepository.remove(userToDelete);
  }

}

