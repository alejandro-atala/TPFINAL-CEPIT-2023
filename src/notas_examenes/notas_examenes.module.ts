import { Module } from '@nestjs/common';
import { NotasExamenesService } from './notas_examenes.service';
import { NotasExamenesController } from './notas_examenes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotaExamen } from './entities/notas_examene.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      NotaExamen
    ])
  ],
  controllers: [NotasExamenesController],
  providers: [NotasExamenesService],
})
export class NotasExamenesModule {}
