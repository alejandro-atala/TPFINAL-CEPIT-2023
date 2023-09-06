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

  @Column({unique: true})
  email: string;

  @Column()
  password: string; 

  @Column()
  tipo: string;

  @Column()
  curso: number;

  @OneToOne(() => Alumno, alumno => alumno.usuarioId, { cascade: true })

  alumno: Alumno;

  @OneToOne(() => Profesor, profesor => profesor.usuarioId, { cascade: true })

  profesor: Alumno;
   



  // Otros atributos y métodos de la entidad Usuario
} 
