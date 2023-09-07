import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { Alumno } from 'src/alumno/entities/alumno.entity';
import { Profesor } from 'src/profesor/entities/profesor.entity';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  idUsuario: number;

  @Column()
  nombre: string;

  @Column()
  dni: string;

  @Column({ type: 'date'  })
  fechaNac: Date;

  @Column()
  direccion: string;

  @Column()
  telefono: string;

  @Column()
  email: string;

  @Column()
  password: string; 

  @Column()
  tipo: string;

  @Column()
  curso: string;

  @OneToOne(() => Alumno, alumno => alumno.idAlumno) // Define the relationship 
  alumno: Alumno; 

  @OneToOne(() => Profesor, profesor => profesor.idProfesor) // Define the relationship
  profesor: Profesor; 



} 
