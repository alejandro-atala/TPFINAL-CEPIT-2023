
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Profesor } from 'src/profesor/entities/profesor.entity'; 
import { Materia } from 'src/materia/entities/materia.entity';
import { NotaExamen } from 'src/notas_examenes/entities/notas_examenes.entity'; 
import { Curso } from 'src/curso/entities/curso.entity';
import { ApiProperty } from '@nestjs/swagger';


@Entity()
export class MateriaCurso {

  @ApiProperty({
    type: Number,
    description: 'This is a required property',
  })
  @PrimaryGeneratedColumn()
  idMateriaCurso: number;


  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @Column({nullable:true})
  public materia: string;


  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @Column() 
  public diaHora: string;


  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @Column() 
  public anio: string;



  @ManyToOne(() => Curso, curso => curso.idCurso)
  curso: Curso;

  @OneToMany(() => Materia, materia => materia.idMateria)
  materias: Materia[];

 
} 
  