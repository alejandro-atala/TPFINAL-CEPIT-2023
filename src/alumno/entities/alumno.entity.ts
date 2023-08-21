import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { AlumnoCurso } from 'src/alumno-curso/entities/alumno-curso.entity'; 
import { Asistencia } from 'src/asistencia/entities/asistencia.entity'; 
import { NotaExamen } from 'src/notas_examenes/entities/notas_examene.entity'; 

@Entity()
export class Alumno {
  @PrimaryGeneratedColumn()
  idAlumno: number;

  @OneToMany(() => AlumnoCurso, alumnoCurso => alumnoCurso.alumno)
  alumnosCursos: AlumnoCurso[];

  @OneToMany(() => Asistencia, asistencia => asistencia.alumno)
  asistencias: Asistencia[];

  @OneToMany(() => NotaExamen, notaExamen => notaExamen.alumno)
  notasExamenes: NotaExamen[];
}
