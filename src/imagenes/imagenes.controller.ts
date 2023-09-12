import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ImagenesService } from './imagenes.service';
import { CreateImageneDto } from './dto/create-imagene.dto';
import { UpdateImageneDto } from './dto/update-imagene.dto';
import { Imagenes } from './entities/imagene.entity';

@Controller('imagenes')
export class ImagenesController {
  constructor(private readonly imagenesService: ImagenesService) {}

  @Post()
  async create(@Body() createImagenDto: CreateImageneDto): Promise<Imagenes> {
    return await this.imagenesService.create(createImagenDto);
  }
  

  @Get()
  async findAll(): Promise<Imagenes[]> {
    return await this.imagenesService.findAll(); 
  }

  @Get('nombre/:nombre') // Nueva ruta para buscar por nombre
  async findByNombre(@Param('nombre') nombre: string): Promise<Imagenes> {
    return this.imagenesService.findByNombre(nombre);
  }

  @Delete('nombre/:nombre')
async deleteByNombre(@Param('nombre') nombre: string): Promise<void> {
  await this.imagenesService.deleteByNombre(nombre);
}

}
