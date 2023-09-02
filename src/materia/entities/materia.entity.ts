import { Entity, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable, OneToMany, Column } from 'typeorm';
import { Curso } from 'src/curso/entities/curso.entity'; 
import { MateriaCurso } from 'src/materia-curso/entities/materia-curso.entity'; 
import { NotaExamen } from 'src/notas_examenes/entities/notas_examenes.entity';

@Entity()
export class Materia {
  @PrimaryGeneratedColumn()
  idMateria: number;

  @Column()
  nombre: string;

  @OneToMany(() => NotaExamen, notaExamen => notaExamen.idNota)
  notasExamenes: NotaExamen[];  
}
