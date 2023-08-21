import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Alumno } from 'src/alumno/entities/alumno.entity'; 

@Entity()
export class Asistencia {
  @PrimaryGeneratedColumn()
  idAsistencia: number;

  @ManyToOne(() => Alumno, alumno => alumno.asistencias)
  alumno: Alumno;

  @Column()
  fecha: Date; 
  asistencia: string;
}
