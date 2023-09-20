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
    const nuevoAviso = new Aviso();
    nuevoAviso.contenido = createAvisoDto.contenido;
    nuevoAviso.curso = createAvisoDto.curso; 
    nuevoAviso.profesorIdProfesor = createAvisoDto.profesorIdProfesor; 
    nuevoAviso.nombreProfesor = createAvisoDto.nombreProfesor; 
  
    return await this.avisoRepository.save(nuevoAviso);
  }

  async marcarAvisosComoLeidos(): Promise<void> {
    try {
      // Consulta todos los avisos no leídos (donde 'leido' es false)
      const avisosNoLeidos = await this.avisoRepository.find({ where: { leido: false } });
  
      if (avisosNoLeidos.length === 0) {
        // No hay avisos no leídos, no se realiza ninguna actualización
        return;
      }
  
      // Marca todos los avisos no leídos como leídos
      avisosNoLeidos.forEach((aviso) => {
        aviso.leido = true;
      });
  
      // Guarda las actualizaciones en la base de datos
      await this.avisoRepository.save(avisosNoLeidos);
    } catch (error) {
      // Maneja errores aquí
      console.error('Error al marcar avisos como leídos:', error);
    }
  }

  async getUnreadAvisosCount(): Promise<number> {
    // Consulta la base de datos para contar los avisos no leídos (donde 'leido' es false)
    const unreadAvisosCount = await this.avisoRepository.count({ where: { leido: false } });
    return unreadAvisosCount;
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