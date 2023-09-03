import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CredencialesDto } from './dto/credenciales.dto';
import { Alumno } from 'src/alumno/entities/alumno.entity';
import { Profesor } from 'src/profesor/entities/profesor.entity';
import { InjectRepository } from '@nestjs/typeorm';

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

  async iniciarSesion(credenciales: CredencialesDto) {
    try {
      const usuario = await this.buscarPorEmail(credenciales.email);

      if (!usuario) {
        throw new UnauthorizedException('Correo electrónico no registrado');
      }

      // Verificar la contraseña
      const contraseñaCoincide = await this.verificarContraseña(
        credenciales,
        usuario,
      );

      if (!contraseñaCoincide) {
        throw new UnauthorizedException('Contraseña incorrecta');
      }

      if (usuario.tipo !== 'Alumno' && usuario.tipo !== 'Profesor') {
        throw new UnauthorizedException('Tipo de usuario no válido');
      }

      // Redirigir a diferentes rutas según el tipo de usuario
      if (usuario.tipo === 'Alumno' || usuario.tipo === 'Profesor') {
        const token = await this.generateToken(usuario);
        return {
          tipo: usuario.tipo,
          nombre: usuario.nombre,
          id: usuario.idUsuario,
          token,
        };
      }
    } catch (error) {
      throw new UnauthorizedException('Error al iniciar sesión');
    }
  }

  async createRegistro(createUsuarioDto: CreateUsuarioDto) {
    try {
      const nuevoUsuario = await this.createUsuario(createUsuarioDto);
      let usuarioAsociado;

      // Verificar el tipo de usuario y asociarlo a la tabla correspondiente
      if (createUsuarioDto.tipo === 'Alumno') {
        usuarioAsociado = await this.asociarAlumno(nuevoUsuario, createUsuarioDto);
      } else if (createUsuarioDto.tipo === 'Profesor') {
        usuarioAsociado = await this.asociarProfesor(nuevoUsuario, createUsuarioDto);
      }
      return usuarioAsociado;
    } catch (error) {
      // Lanza una excepción personalizada con un mensaje informativo
      throw new Error(`Error al crear el usuario: ${error.message}`);
    }
  }

  async createUsuario(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    const nuevoUsuario = this.usuarioRepository.create(createUsuarioDto);
    nuevoUsuario.password = await bcrypt.hash(
      nuevoUsuario.password,
      saltRounds,
    );

    return this.usuarioRepository.save(nuevoUsuario);
  }

  async buscarPorEmail(email: string): Promise<Usuario | null> {
    return this.usuarioRepository.findOne({ where: { email } });
  }

  async verificarContraseña(
    credenciales: CredencialesDto,
    usuario: Usuario,
  ): Promise<boolean> {
    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const contraseñaCoincide = await bcrypt.compare(
      credenciales.password,
      usuario.password,
    );

    if (!contraseñaCoincide) {
      throw new NotFoundException('Contraseña incorrecta');
    }

    return true;
  }

  async generateToken(user: Usuario): Promise<string> {
    const payload = {
      usuario: user.idUsuario, // User ID
      email: user.email, // User email or any other relevant information
    };

    // Implement your token generation logic here
    // You may use the AuthService for this purpose
    // Example: const token = await this.authService.generateToken(payload);
    // Make sure to inject the AuthService and call its generateToken method

    return 'your-token-here'; // Replace with the actual token generation logic
  }

  async asociarAlumno(usuario: Usuario, createUsuarioDto: CreateUsuarioDto) {
    const alumno = new Alumno();
    alumno.nombre = usuario.nombre;
    // alumno.idAlumno = usuario.idUsuario;
    alumno.curso = createUsuarioDto.curso;
    alumno.usuarioId = usuario.idUsuario;
    return this.alumnoRepository.save(alumno);
  }

  async asociarProfesor(usuario: Usuario, createUsuarioDto: CreateUsuarioDto) {
    const profesor = new Profesor();
    profesor.nombre = usuario.nombre;
    profesor.usuarioId = usuario.idUsuario;
    return this.profesorRepository.save(profesor);
  }
}
