import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateNotasExameneDto } from './dto/create-notas_examenes.dto';
import { NotaExamen } from './entities/notas_examenes.entity';
import { UpdateNotasExameneDto } from './dto/update-notas_examenes.dto';

@Injectable()
export class NotasExamenesService {
  constructor(
    @InjectRepository(NotaExamen)
    private readonly notasExameneRepository: Repository<NotaExamen>,
  ) {}

  async create(createNotasExameneDto: CreateNotasExameneDto): Promise<NotaExamen> {
    const newNota = this.notasExameneRepository.create(createNotasExameneDto);
    return await this.notasExameneRepository.save(newNota);
  }

  async update(id: number, updateNotasExameneDto: UpdateNotasExameneDto): Promise<NotaExamen> {
    const notaToUpdate = await this.notasExameneRepository.findOne({ where: { idNota: id } });
    if (!notaToUpdate) {
      throw new NotFoundException(`NotasExamene with id ${id} not found`);
    }

    await this.notasExameneRepository.update({ idNota: id }, updateNotasExameneDto);
    return await this.notasExameneRepository.findOne({ where: { idNota: id } });
  }


  async findAll(): Promise<NotaExamen[]> {
    return await this.notasExameneRepository.find();
  }

  
async findOne(id: number): Promise<NotaExamen | undefined> {
  const options: FindOneOptions<NotaExamen> = {
    where: { idNota: id }, // Ajusta la propiedad y el valor para que coincida con tus entidades
  };
  return await this.notasExameneRepository.findOne(options);
}


  async remove(id: number): Promise<void> {
    await this.notasExameneRepository.delete(id);
  }
}
