import { Controller, Get, Post, Body, Param, ParseIntPipe, Put, Delete } from '@nestjs/common';
import { AvisosService } from './aviso.service'; 
import { CreateAvisoDto } from './dto/create-aviso.dto';
import { UpdateAvisoDto } from './dto/update-curso.dto'; 
import { Aviso } from './entities/aviso.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('avisos')
@Controller('avisos')
export class AvisosController {
  constructor(private readonly avisosService: AvisosService) {}

  @Post()
  async create(@Body() createAvisoDto: CreateAvisoDto): Promise<Aviso> {
    return await this.avisosService.create(createAvisoDto);
  }

  @Get('por-curso/:curso') 
  async findOneByCurso(@Param('curso', ParseIntPipe) curso: number): Promise<Aviso | undefined> {
    return await this.avisosService.findOneByCurso(curso);
  }
  @Get()
  async findAll(): Promise<Aviso[]> {
    return await this.avisosService.findAll();
  }

  @Get('no-leidos')
  async getUnreadAvisosCount(): Promise<{ unreadCount: number }> {
    const unreadCount = await this.avisosService.getUnreadAvisosCount(); // Debes implementar este método en tu servicio
    return { unreadCount };
  }

  @Put('marcar-leidos')
  async marcarAvisosComoLeidos(): Promise<void> {
    await this.avisosService.marcarAvisosComoLeidos();
  }

  @Put(':id')
  async updateById(@Param('id') id: number, @Body() updateAvisoDto: UpdateAvisoDto): Promise<Aviso | undefined> {

    return await this.avisosService.updateById(id, updateAvisoDto);
  }

  @Delete(':id')
  async removeById(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.avisosService.removeById(id);
  }
}
