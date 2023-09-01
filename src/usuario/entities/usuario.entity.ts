import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { Alumno } from 'src/alumno/entities/alumno.entity';

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
  curso: number;

  @OneToOne(() => Alumno, alumno => alumno.idAlumno) // Define the relationship
  
  alumno: Alumno; 



  // Otros atributos y métodos de la entidad Usuario
} 
