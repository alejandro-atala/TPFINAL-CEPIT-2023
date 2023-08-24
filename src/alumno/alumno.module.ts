import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Alumno } from './entities/alumno.entity';
import { AlumnoController } from './alumno.controller';
import { AlumnoService } from './alumno.service';

@Module({
  imports: [TypeOrmModule.forFeature([Alumno])],
  controllers: [AlumnoController],
  providers: [AlumnoService],
})
export class AlumnoModule {}
