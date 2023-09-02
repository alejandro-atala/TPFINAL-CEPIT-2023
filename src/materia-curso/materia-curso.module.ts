import { Module } from '@nestjs/common';
import { MateriasCursoService } from './materia-curso.service';
import { MateriasCursoController } from './materia-curso.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MateriaCurso } from './entities/materia-curso.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MateriaCurso
    ])
  ],
  controllers: [MateriasCursoController],
  providers: [MateriasCursoService],
})
export class MateriaModule {}
