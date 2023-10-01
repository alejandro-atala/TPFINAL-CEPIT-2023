import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from 'typeorm';


@Entity()
export class AlumnoAviso {
  @PrimaryGeneratedColumn()
  idAlumnoAviso: number;

  @Column()
  avisoIdAviso: number;

  @Column()
  alumnoIdAlumno: number;

  @Column({ default: false }) // Agrega esta línea para el campo 'leido'
  leido: boolean;


  
 }