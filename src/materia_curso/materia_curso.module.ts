import { Module } from '@nestjs/common';
import { MateriaCursoService } from './materia_curso.service';
import { MateriaCursoController } from './materia_curso.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MateriaCurso } from './entities/materia_curso.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MateriaCurso
    ])
  ],
  controllers: [MateriaCursoController],
  providers: [MateriaCursoService],
})
export class MateriaCursoModule {}
