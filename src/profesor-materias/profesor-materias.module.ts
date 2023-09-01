import { Module } from '@nestjs/common';
import { ProfesorMateriasService } from './profesor-materias.service';
import { ProfesorMateriasController } from './profesor-materias.controller';

@Module({
  controllers: [ProfesorMateriasController],
  providers: [ProfesorMateriasService],
})
export class ProfesorMateriasModule {}
