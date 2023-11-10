import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Profesor } from 'src/profesor/entities/profesor.entity';
import { Curso } from 'src/curso/entities/curso.entity';
import { AlumnoAviso } from 'src/alumno-aviso/entities/alumno-aviso.entity';

@Entity()
export class Aviso {
  @PrimaryGeneratedColumn()
  idAviso: number;

  @Column()
  contenido: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha: Date;

  @Column()
  curso: string;

  @Column()
  profesorIdProfesor: number;

  @Column()
  nombreProfesor: string;


@ManyToOne(() => Profesor, { onDelete: 'CASCADE' })
@JoinColumn({ name: 'profesorIdProfesor' })
profesor: Profesor;


}