import { Entity, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable, OneToMany, Column } from 'typeorm';
import { Curso } from 'src/curso/entities/curso.entity'; 
import { MateriaCurso } from 'src/materia-curso/entities/materia-curso.entity'; 
import { NotaExamen } from 'src/notas_examenes/entities/notas_examenes.entity';
import { ApiProperty } from '@nestjs/swagger';


@Entity()
export class Materia {

  @ApiProperty({
    type: Number,
    description: 'This is a required property',
  })
  @PrimaryGeneratedColumn()
  idMateria: number;


  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @Column()
  nombre: string;

  @OneToMany(() => NotaExamen, notaExamen => notaExamen.idNota)
  notasExamenes: NotaExamen[];  
}
