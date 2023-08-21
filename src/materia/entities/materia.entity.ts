import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Profesor } from 'src/profesor/entities/profesor.entity'; 
import { MateriaCurso } from 'src/materia_curso/entities/materia_curso.entity'; 
import { NotaExamen } from 'src/notas_examenes/entities/notas_examene.entity'; 

@Entity()
export class Materia {
  @PrimaryGeneratedColumn()
  idMateria: number;

  @ManyToOne(() => Profesor, profesor => profesor.materias)
  profesor: Profesor;

  @OneToMany(() => MateriaCurso, materiaCurso => materiaCurso.materia)
  materiasCursos: MateriaCurso[];

  @OneToMany(() => NotaExamen, notaExamen => notaExamen.materia)
  notasExamenes: NotaExamen[];
}
