import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { AlumnoCurso } from 'src/alumno-curso/entities/alumno-curso.entity'; 
import { Asistencia } from 'src/asistencia/entities/asistencia.entity'; 
import { NotaExamen } from 'src/notas_examenes/entities/notas_examene.entity'; 

@Entity()
export class Alumno {
  @PrimaryGeneratedColumn()
  idAlumno: number;

  @OneToMany(() => AlumnoCurso, alumnoCurso => alumnoCurso.idAlumnoCurso)
  alumnosCursos: AlumnoCurso[];

  @OneToMany(() => Asistencia, asistencia => asistencia.idAsistencia)
  asistencias: Asistencia[];

  @OneToMany(() => NotaExamen, notaExamen => notaExamen.idNotaExamen)
  notasExamenes: NotaExamen[];
}
