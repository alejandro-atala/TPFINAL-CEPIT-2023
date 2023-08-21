import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Escuela } from 'src/escuela/entities/escuela.entity'; 
import { MateriaCurso } from 'src/materia_curso/entities/materia_curso.entity';
import { AlumnoCurso } from 'src/alumno-curso/entities/alumno-curso.entity';

@Entity()
export class Curso {
  @PrimaryGeneratedColumn()
  idCurso: number;

  @ManyToOne(() => Escuela, escuela => escuela.cursos)
  escuela: Escuela;

  @OneToMany(() => MateriaCurso, materiaCurso => materiaCurso.curso)
  materiasCursos: MateriaCurso[];

  @OneToMany(() => AlumnoCurso, alumnoCurso => alumnoCurso.curso)
  alumnosCursos: AlumnoCurso[];
  alumnos: number;
}
