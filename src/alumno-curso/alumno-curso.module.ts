import { Module } from '@nestjs/common';
import { AlumnoCursoService } from './alumno-curso.service';
import { AlumnoCursoController } from './alumno-curso.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlumnoCurso } from './entities/alumno-curso.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AlumnoCurso
    ])
  ],
  controllers: [AlumnoCursoController],
  providers: [AlumnoCursoService],
})
export class AlumnoCursoModule {}
