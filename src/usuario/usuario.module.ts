import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Alumno } from 'src/alumno/entities/alumno.entity';
import { Profesor } from 'src/profesor/entities/profesor.entity';
import { ProfesorService } from 'src/profesor/profesor.service';
import { AlumnoService } from 'src/alumno/alumno.service';
import { JwtModule } from '@nestjs/jwt';
import { Message } from 'src/message/entities/message.entity';
import { MessageService } from 'src/message/message.service';
import { Aviso } from 'src/avisos/entities/aviso.entity';
import { AvisosService } from 'src/avisos/aviso.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario, Profesor, Alumno, Message, Aviso]),
    JwtModule.register({
      secret: 'ProgramadorFullStack2023', // Tu clave secreta aquí
      signOptions: { expiresIn: '5m' },
    }),
  ],
  controllers: [UsuarioController],
  providers: [UsuarioService, ProfesorService, AlumnoService, MessageService, AvisosService],
})
export class UsuarioModule {}