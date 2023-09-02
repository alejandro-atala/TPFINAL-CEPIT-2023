
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Profesor } from 'src/profesor/entities/profesor.entity'; 
import { Materia } from 'src/materia/entities/materia.entity';
import { NotaExamen } from 'src/notas_examenes/entities/notas_examenes.entity'; 
import { Curso } from 'src/curso/entities/curso.entity';

@Entity()
export class MateriaCurso {
  @PrimaryGeneratedColumn()
  idMateriaCurso: number;

  @Column({nullable:true})
  public materia: string;

  @Column() 
  public diaHora: string;

  @Column() 
  public anio: string;

  @ManyToOne(() => Curso, curso => curso.idCurso)
  curso: Curso;

  @OneToMany(() => Materia, materia => materia.idMateria)
  materias: Materia[];

 
} 
  