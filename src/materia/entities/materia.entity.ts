import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Profesor } from 'src/profesor/entities/profesor.entity'; 
import { MateriaCurso } from 'src/materia_curso/entities/materia_curso.entity'; 
import { NotaExamen } from 'src/notas_examenes/entities/notas_examenes.entity'; 

@Entity()
export class Materia {
  @PrimaryGeneratedColumn()
  idMateria: number;

  @ManyToOne(() => Profesor, profesor => profesor.idProfesor)
  profesor: Profesor;

  @OneToMany(() => MateriaCurso, materiaCurso => materiaCurso.idMateriaCurso)
  materiasCursos: MateriaCurso[];

  @OneToMany(() => NotaExamen, notaExamen => notaExamen.idNota)
  notasExamenes: NotaExamen[];
}
