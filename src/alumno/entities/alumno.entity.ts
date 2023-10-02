import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { Curso } from 'src/curso/entities/curso.entity';  // Asegúrate de importar correctamente
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { ApiProperty } from '@nestjs/swagger';
import { AlumnoAviso } from 'src/alumno-aviso/entities/alumno-aviso.entity';

@Entity()
export class Alumno {

  @ApiProperty({
    type: Number,
    description: 'This is a required property',
  })
  @PrimaryGeneratedColumn()
  idAlumno: number;

  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @Column()
  nombre: string;

  @ApiProperty({
    type: Number,
    description: 'This is a required property',
  })
  @Column()
  usuarioId: number;

  @ApiProperty({
    type: Number,
    description: 'This is a required property',
  })
  @Column()
  curso: number;

  @OneToOne(() => Usuario, usuario => usuario.alumno)
  @JoinColumn({ name: 'usuarioId' })
  usuario: number;


  @ManyToOne(() => Curso, curso => curso.alumnos)
  @JoinColumn({ name: 'curso' })
  cursoIdCurso: number;

  
}


