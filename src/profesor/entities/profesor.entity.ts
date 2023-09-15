import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn, ManyToMany, ManyToOne } from 'typeorm';
import { Materia } from 'src/materia/entities/materia.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Curso } from 'src/curso/entities/curso.entity';
import { ApiProperty } from '@nestjs/swagger';


@Entity()
export class Profesor {

  @ApiProperty({
    type: Number,
    description: 'This is a required property',
  })
  @PrimaryGeneratedColumn()
  idProfesor: number;


  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @Column()
  nombre: string;

  

  @ManyToMany(() => Curso, (curso) => curso.profesores)
  cursos: Curso[];

  @OneToMany(() => Materia, materia => materia.idMateria)
  materias: Materia[];

  // @Column()
  // usuarioId: number;



  @OneToOne(() => Usuario, usuario => usuario.idUsuario)
  @JoinColumn({ name: 'usuarioId' })
  usuarioId: number;

  
  // @ManyToOne(() => Curso, curso => curso.alumnos)
  // curso: number;

} 
