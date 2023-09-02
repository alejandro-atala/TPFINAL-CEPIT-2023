import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
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

  @Patch(':nombre')
  async update(@Param('nombre') nombre: string, @Body() updateMateriaDto: UpdateMateriaDto): Promise<Materia | undefined> {
    return await this.materiaService.update(nombre, updateMateriaDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.materiaService.remove(+id);
  }
}
