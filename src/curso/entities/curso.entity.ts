import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Escuela } from 'src/escuela/entities/escuela.entity'; 
import { MateriaCurso } from 'src/materia_curso/entities/materia_curso.entity';
import { AlumnoCurso } from 'src/alumno-curso/entities/alumno-curso.entity';

@Entity()
export class Curso {
  @PrimaryGeneratedColumn()
  idCurso: number;

  @ManyToOne(() => Escuela, escuela => escuela.idEscuela)
  escuela: Escuela;

  @OneToMany(() => MateriaCurso, materiaCurso => materiaCurso.idMateriaCurso)
  materiasCursos: MateriaCurso[];

  @OneToMany(() => AlumnoCurso, alumnoCurso => alumnoCurso.idAlumnoCurso)
  alumnosCursos: AlumnoCurso[];
  alumnos: number;
}
