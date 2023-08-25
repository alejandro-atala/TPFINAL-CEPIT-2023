import { Alumno } from 'src/alumno/entities/alumno.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Asistencia {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  idAlumno: number; // Cambia 'alumno' a 'idAlumno'

  @Column()
  nombre: string; // Agrega el campo para el nombre del alumno

  @Column()
  anio: string;

  @Column()
  fecha: Date;

  @Column()
  asistencia: string;


  @ManyToOne(() => Alumno, alumno => alumno.idAlumno)
  @JoinColumn()
  alumnos: Alumno;
}
  
// import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
// import { Alumno } from 'src/alumno/entities/alumno.entity';

// @Entity()
// export class Asistencia {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column()
//   fecha: Date;

//   @Column()
//   asistencia: string;

//   @ManyToOne(() => Alumno, alumno => alumno.asistencias)
//   @JoinColumn({ name: 'alumnoId' })
//   alumno: Alumno; // Debes asignar el objeto Alumno, no el nombre
// }

 