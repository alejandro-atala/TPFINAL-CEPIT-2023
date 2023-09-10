import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDataCargaDto } from './dto/create-data-carga.dto';
import { Textos } from './entities/data-carga.entity';

@Injectable()
export class DataCargaService {
  constructor(
    @InjectRepository(Textos)
    private readonly dataCargaRepository: Repository<Textos>,
  ) {}

  async create(createTextosDto: CreateDataCargaDto): Promise<Textos> {
    const { referencia, texto } = createTextosDto;

    const newTexto = this.dataCargaRepository.create({referencia, texto }); // Crea una nueva instancia de Textos
    console.log(newTexto);
    return await this.dataCargaRepository.save(newTexto);
  }

  async findAll(): Promise<Textos[]> {
    return await this.dataCargaRepository.find();
  }

  async findByReferencia(referencia: string): Promise<Textos | undefined> {
    return await this.dataCargaRepository.findOne({where: {referencia: referencia}} );
  }

  async findOne(id: number): Promise<Textos | undefined> {
    return await this.dataCargaRepository.findOne({where: {id: id}});
  }

  async update(id: number, updateDataCargaDto: CreateDataCargaDto): Promise<Textos | undefined> {
    await this.dataCargaRepository.update(id, updateDataCargaDto);
    return await this.dataCargaRepository.findOne({where: {id: id}});
  }

  async remove(id: number): Promise<void> {
    await this.dataCargaRepository.delete(id);
  }
}
