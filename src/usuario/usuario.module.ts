import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Alumno } from 'src/alumno/entities/alumno.entity';
import { Profesor } from 'src/profesor/entities/profesor.entity';
import { ProfesorService } from 'src/profesor/profesor.service';
import { AlumnoService } from 'src/alumno/alumno.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Usuario, Profesor,Alumno
    ])
  ],
  controllers: [UsuarioController],
  providers: [UsuarioService, ProfesorService, AlumnoService],
})
export class UsuarioModule {}
