import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlumnoAvisoService } from './alumno-aviso.service';
import { AlumnoAvisoController } from './alumno-aviso.controller';
import { AlumnoAviso } from './entities/alumno-aviso.entity';
import { Alumno } from 'src/alumno/entities/alumno.entity'; 
import { Aviso } from 'src/avisos/entities/aviso.entity';
import { AlumnoRepository } from 'src/alumno/alumno.repository';
import { AvisoRepository } from 'src/avisos/aviso.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([AlumnoAviso, Alumno, Aviso, AlumnoRepository, AvisoRepository]), // Registra las entidades y repositorios aquí
    // Otros módulos importados, si es necesario
  ],
  providers: [AlumnoAvisoService],
  controllers: [AlumnoAvisoController],
})
export class AlumnoAvisoModule {}
