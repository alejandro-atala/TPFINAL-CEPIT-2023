import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { MateriaService } from './materia.service';
import { CreateMateriaDto } from './dto/create-materia.dto';
import { UpdateMateriaDto } from './dto/update-materia.dto';
import { Materia } from './entities/materia.entity';

@Controller('materias')
export class MateriaController {
  constructor(private readonly materiaService: MateriaService) {}

  @Post()
  async create(@Body() createMateriaDto: CreateMateriaDto): Promise<Materia> {
    return await this.materiaService.create(createMateriaDto);
  }
  

  @Get()
  async findAll(): Promise<Materia[]> {
    return await this.materiaService.findAll();
  }

  @Get(':nombre')
  async findOne(@Param('nombre') nombre: string): Promise<Materia | undefined> {
    return await this.materiaService.findOneByNombre(nombre);
  }

  @Put(':id')
  async updateById(@Param('id') id: number, @Body() updateMateriaDto: UpdateMateriaDto): Promise<Materia | undefined> {

    return await this.materiaService.updateById(id, updateMateriaDto);
  }
  

  @Delete(':id')
  async removeById(@Param('id') id: number): Promise<void> {
    await this.materiaService.removeById(id);
  }
  
}