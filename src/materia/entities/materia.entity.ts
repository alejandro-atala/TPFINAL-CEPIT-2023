import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Profesor } from 'src/profesor/entities/profesor.entity'; 
import { MateriaCurso } from 'src/materia_curso/entities/materia_curso.entity'; 
import { NotaExamen } from 'src/notas_examenes/entities/notas_examenes.entity'; 
import { Curso } from 'src/curso/entities/curso.entity';

@Entity()
export class Materia {
  @PrimaryGeneratedColumn()
  idMateria: number;

  @Column()
  public materia: string;

  @Column() 
  public diaHora: string;

  @Column() 
  public anio: string;

  @ManyToOne(() => Curso, curso => curso.idCurso)
  curso: Curso;

  @OneToMany(() => MateriaCurso, materiaCurso => materiaCurso.idMateriaCurso)
  materiasCursos: MateriaCurso[];

  @OneToMany(() => NotaExamen, notaExamen => notaExamen.idNota)
  notasExamenes: NotaExamen[];  
} 
  