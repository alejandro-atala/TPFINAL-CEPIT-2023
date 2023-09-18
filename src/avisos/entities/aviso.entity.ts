import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Profesor } from 'src/profesor/entities/profesor.entity';
import { Curso } from 'src/curso/entities/curso.entity';

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

  @ManyToOne(() => Profesor)
  @JoinColumn({ name: 'profesorIdProfesor' })
  profesor: Profesor;

}