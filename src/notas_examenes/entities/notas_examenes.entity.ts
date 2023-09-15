import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Materia } from 'src/materia/entities/materia.entity'; 
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class NotaExamen {

  @ApiProperty({
    type: Number,
    description: 'This is a required property',
  })
  @PrimaryGeneratedColumn()
  public idNota: number;


  @ApiProperty({
    type: Number,
    description: 'This is a required property',
  })
  @Column()
  public idAlumno: number;


  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @Column()
  public nombre: string;


  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @Column()
  public anio: string;


  @ApiProperty({
    type: Date,
    description: 'This is a required property',
  })
  @Column()
  public fechaNota: Date;


  @ApiProperty({
    type: Number,
    description: 'This is a required property',
  })
  @Column()
  public nota: number;


  @ApiProperty({
    type: Number,
    description: 'This is a required property',
  })
  @Column()
  public trimestre: number;



 
  @ManyToOne(() => Materia, materia => materia.notasExamenes)
  materia: Materia[];
  // Otros atributos y métodos si es necesario
} 
   