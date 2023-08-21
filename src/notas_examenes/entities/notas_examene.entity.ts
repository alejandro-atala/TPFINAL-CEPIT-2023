import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Alumno } from 'src/alumno/entities/alumno.entity'; 
import { Materia } from 'src/materia/entities/materia.entity';
@Entity()
export class NotaExamen {
  @PrimaryGeneratedColumn()
  idNotaExamen: number;

  @ManyToOne(() => Alumno, alumno => alumno.notasExamenes)
  alumno: Alumno;

  @ManyToOne(() => Materia, materia => materia.notasExamenes)
  materia: Materia;

  // Otros atributos como la nota del examen, fecha, etc.
}
