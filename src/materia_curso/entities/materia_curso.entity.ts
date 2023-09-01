import { Entity, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { Curso } from 'src/curso/entities/curso.entity'; 
import { Materia } from 'src/materia/entities/materia.entity'; 

@Entity()
export class MateriaCurso {
  @PrimaryGeneratedColumn()
  idMateriaCurso: number;

  @ManyToOne(() => Curso, curso => curso.idCurso)
  curso: Curso;

  @ManyToOne(() => Materia, materia => materia.idMateria)
  materia: Materia;
}
