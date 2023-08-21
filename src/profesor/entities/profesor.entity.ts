import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Materia } from 'src/materia/entities/materia.entity'; 

@Entity()
export class Profesor {
  @PrimaryGeneratedColumn()
  idProfesor: number;

  @OneToMany(() => Materia, materia => materia.profesor)
  materias: Materia[];
}
