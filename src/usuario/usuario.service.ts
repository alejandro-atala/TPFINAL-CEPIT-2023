import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Controller, Post, Body } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CredencialesDto } from './dto/credenciales.dto';
import { Alumno } from 'src/alumno/entities/alumno.entity';
import { Profesor } from 'src/profesor/entities/profesor.entity';
const saltRounds = 10; // Número de rondas de encriptación


@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
    @InjectRepository(Profesor) 
     private profesorRepository: Repository<Profesor>,
     @InjectRepository(Alumno)
     private alumnoRepository: Repository<Alumno>,
  ) {}



  async createRegistro(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    const nuevoUsuario = this.usuarioRepository.create(createUsuarioDto);
  
    nuevoUsuario.password = await bcrypt.hash(nuevoUsuario.password, saltRounds);
  
    return await this.usuarioRepository.save(nuevoUsuario);
  }

  async buscarPorEmail(email: string): Promise<Usuario | null> {
    return this.usuarioRepository.findOne({ where: { email } });
  }
  

  async verificarContraseña(credenciales: CredencialesDto): Promise<Usuario | null> {
    const usuario = await this.buscarPorEmail(credenciales.email);

    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const contraseñaCoincide = await bcrypt.compare(credenciales.password, usuario.password);

    if (!contraseñaCoincide) {
      throw new NotFoundException('Contraseña incorrecta');
    }

    
    return usuario;
  }


async verificarTipoUsuario(credenciales: CredencialesDto, tipo: string): Promise<Usuario | null> {
    const usuario = await this.verificarContraseña(credenciales);

    if (usuario.tipo !== tipo) {
      throw new UnauthorizedException('Tipo de usuario incorrecto');
    }

    return usuario;
  }

  
  async asociarAlumno(alumno: Alumno): Promise<Alumno> {
    return await this.alumnoRepository.save(alumno);
  }

  async asociarProfesor(profesor: Profesor): Promise<Profesor> {
    //console.log(profesor);
    return await this.profesorRepository.save(profesor);
  }
  

  findAll() {
    return `This action returns all usuario`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usuario`;
  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return `This action updates a #${id} usuario`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuario`;
  }
}
