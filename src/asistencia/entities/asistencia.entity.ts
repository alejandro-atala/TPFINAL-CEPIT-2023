import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Alumno } from 'src/alumno/entities/alumno.entity'; 

@Entity()
export class Asistencia {
  @PrimaryGeneratedColumn()
  idAsistencia: number;

  @Column()
  fecha: Date; 

  @Column()
  asistencia: string;

  @ManyToOne(() => Alumno, alumno => alumno.idAlumno)
  alumno: Alumno;
}
