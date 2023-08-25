import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Curso } from 'src/curso/entities/curso.entity';  // Asegúrate de importar correctamente

@Entity()
export class Alumno {
  @PrimaryGeneratedColumn()
  idAlumno: number;

  @Column()
  nombre: string;

  @ManyToOne(() => Curso, curso => curso.alumnos)
  curso: Curso;
  notasExamenes: any;


}

// import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
// import { Curso } from 'src/curso/entities/curso.entity';
// import { Asistencia } from 'src/asistencia/entities/asistencia.entity';

// @Entity()
// export class Alumno {
//   @PrimaryGeneratedColumn()
//   idAlumno: number;

//   @Column()
//   nombre: string;

//   @ManyToOne(() => Curso, curso => curso.alumnos)
//   curso: Curso;

//   @OneToMany(() => Asistencia, asistencia => asistencia.alumno)
//   asistencias: Asistencia[];
// }
