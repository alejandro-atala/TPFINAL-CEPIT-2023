import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Controller, Post, Body } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CredencialesDto } from './dto/credenciales.dto';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  async createRegistro(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    const nuevoUsuario = this.usuarioRepository.create(createUsuarioDto);
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
console.log(credenciales.password)
console.log(usuario.password)
    if (!contraseñaCoincide) {
      throw new NotFoundException('Contraseña incorrecta');
    }
    return usuario;
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
