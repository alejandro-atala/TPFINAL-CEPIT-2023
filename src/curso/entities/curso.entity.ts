import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, OneToMany } from 'typeorm';

import { Materia } from 'src/materia/entities/materia.entity'; 
import { AlumnoCurso } from 'src/alumno-curso/entities/alumno-curso.entity';
import { Alumno } from 'src/alumno/entities/alumno.entity';
import { Profesor } from 'src/profesor/entities/profesor.entity';

@Entity()
export class Curso {
  @PrimaryGeneratedColumn()
  idCurso: number;

  @Column()
  anio: string;

  @OneToMany(() => Alumno, alumno => alumno.idAlumno)
  alumnos: Alumno[];

  @ManyToMany(() => Profesor, (profesor) => profesor.cursos)
  @JoinTable() // Esto es necesario para definir la tabla intermedia
  profesores: Profesor[];;

  @OneToMany(() => Materia, materiaCurso => materiaCurso.idMateria)
  materiasCursos: Materia[];

  @OneToMany(() => AlumnoCurso, alumnoCurso => alumnoCurso.idAlumnoCurso)
  alumnosCursos: AlumnoCurso[];

}
  