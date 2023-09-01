import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, OneToMany } from 'typeorm';

import { MateriaCurso } from 'src/materia_curso/entities/materia_curso.entity';
import { AlumnoCurso } from 'src/alumno-curso/entities/alumno-curso.entity';
import { Alumno } from 'src/alumno/entities/alumno.entity';

@Entity()
export class Curso {
  @PrimaryGeneratedColumn()
  idCurso: number; 

  @Column()
  anio: number;

  @OneToMany(() => Alumno, alumno => alumno.idAlumno)
  alumnos: Alumno[];

  // @ManyToOne(() => Escuela, escuela => escuela.idEscuela)
  // escuela: Escuela;

  @OneToMany(() => MateriaCurso, materiaCurso => materiaCurso.idMateriaCurso)
  materiasCursos: MateriaCurso[];

  @OneToMany(() => AlumnoCurso, alumnoCurso => alumnoCurso.idAlumnoCurso)
  alumnosCursos: AlumnoCurso[];

}
  