import { Body, Injectable, Post } from '@nestjs/common';
import { CreateImageneDto } from './dto/create-imagene.dto';
import { UpdateImageneDto } from './dto/update-imagene.dto';
import { Imagenes } from './entities/imagene.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class ImagenesService {
  constructor(
@InjectRepository(Imagenes)
private readonly imagenesRepository: Repository<Imagenes>,
) {}


async create(createImagenDto: CreateImageneDto): Promise<Imagenes> {
  const imagen = this.imagenesRepository.create(createImagenDto);
  return this.imagenesRepository.save(imagen);
}


async findAll(): Promise<Imagenes[]> {
  return this.imagenesRepository.find();
}

async findByNombre(nombre: string): Promise<Imagenes | undefined> {

  return this.imagenesRepository.findOne({ where: { nombre: nombre } });
}

async deleteByNombre(nombre: string): Promise<void> {
  await this.imagenesRepository.delete({ nombre: nombre });
}

}
