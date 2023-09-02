import { Alumno } from 'src/alumno/entities/alumno.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Asistencia {
  @PrimaryGeneratedColumn()
  id: number;

  // @Column()
  // idAlumno: number; // Cambia 'alumno' a 'idAlumno'

  @Column()
  nombre: string; // Agrega el campo para el nombre del alumno

  @Column()
  anio: string;

  @Column({type: 'date'})
  fecha: Date;

  @Column()
  asistencia: string; 


  @ManyToOne(() => Alumno, alumno => alumno.idAlumno)
  @JoinColumn({name: 'idAlumno',})
  idAlumno: number;
}
  


 