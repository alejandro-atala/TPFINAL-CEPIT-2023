import { Entity, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { Curso } from 'src/curso/entities/curso.entity'; 
import { Alumno } from 'src/alumno/entities/alumno.entity'; 

@Entity()
export class AlumnoCurso {
  @PrimaryGeneratedColumn()
  idAlumnoCurso: number;

  @ManyToOne(() => Curso, curso => curso.alumnosCursos)
  curso: Curso;

  @ManyToOne(() => Alumno, alumno => alumno.alumnosCursos)
  alumno: Alumno;
}
