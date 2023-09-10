import { HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import { DeepPartial, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CredencialesDto } from './dto/credenciales.dto';
import { Alumno } from 'src/alumno/entities/alumno.entity';
import { Profesor } from 'src/profesor/entities/profesor.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

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
    private readonly jwtService: JwtService
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
      // console.log(token);
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
        // Convierte el array de cursos en una cadena de números separados por comas
        const cursosSeparados = createUsuarioDto.curso.join(',');
        // Asigna la cadena de cursos al nuevo usuario profesor
        nuevoUsuario.curso = cursosSeparados;
        // Asocia el usuario profesor a la tabla correspondiente
        usuarioAsociado = await this.asociarProfesor(nuevoUsuario, createUsuarioDto);
      } 
      return usuarioAsociado;
    } catch (error) {
      // Lanza una excepción personalizada con un mensaje informativo
      throw new Error(`Error al crear el usuario: ${error.message}`);
    }
  }
  

  async createUsuario(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    
    // Verifica si createUsuarioDto.curso es un array antes de usar join()
    const cursoArray = Array.isArray(createUsuarioDto.curso) ? createUsuarioDto.curso : [createUsuarioDto.curso];
    
    // Convierte el array de cursos en una cadena de texto separada por comas
    const cursoString = cursoArray.join(',');
  
    // Crea un nuevo usuario y asigna la cadena de cursos
    const nuevoUsuario: DeepPartial<Usuario> = {
      ...createUsuarioDto,
      curso: cursoString,
    };

    // Hash de la contraseña y guarda el usuario
    nuevoUsuario.password = await bcrypt.hash(
      nuevoUsuario.password,
      saltRounds,
    );
   
    const savedUsuario = await this.usuarioRepository.save(nuevoUsuario);

    return savedUsuario; // Devuelve el usuario guardado, no un array de usuarios
  }
  
  

  async buscarPorEmail(email: string): Promise<Usuario | null> {
    return this.usuarioRepository.findOne({ where: { email } });
  }

  async verificarContraseña(credenciales: CredencialesDto, usuario: Usuario,): Promise<boolean> {
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
    try {
      const payload = {
        // usuario: user.idUsuario,
        email: user.email,
        password: user.password
      };
  
      const token = this.jwtService.sign(payload);
     // console.log(token); // Verifica si se imprime el token
      return token;
    } catch (error) {
      console.error(error); // Agrega un registro de errores
      throw new HttpException('Error generando el token', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  

  async asociarAlumno(usuario: Usuario, createUsuarioDto: CreateUsuarioDto) {
    const alumno = new Alumno();
    alumno.nombre = usuario.nombre;

   // alumno.curso = createUsuarioDto.curso;
   alumno.curso = createUsuarioDto.curso[0];

    alumno.usuarioId = usuario.idUsuario;
    console.log("A",alumno)
    return this.alumnoRepository.save(alumno);
  }

  async asociarProfesor(usuario: Usuario, createUsuarioDto: CreateUsuarioDto) {
    const profesor = new Profesor();
    profesor.nombre = usuario.nombre;
    profesor.usuarioId = usuario.idUsuario;
    return this.profesorRepository.save(profesor);
  }
}
