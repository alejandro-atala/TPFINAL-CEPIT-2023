import { Alumno } from 'src/alumno/entities/alumno.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Asistencia {

  @ApiProperty({
    type: Number,
    description: 'This is a required property',
  })
  @PrimaryGeneratedColumn()
  id: number;


  @ApiProperty({
    type: Number,
    description: 'This is a required property',
  })
  @Column()
  idAlumno: number; // Cambia 'alumno' a 'idAlumno'


  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @Column()
  nombre: string; // Agrega el campo para el nombre del alumno


  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @Column()
  anio: string;


  @ApiProperty({
    type: Date,
    description: 'This is a required property',
  })
  @Column()
  fecha: Date;


  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @Column()
  asistencia: string;



  @ManyToOne(() => Alumno, alumno => alumno.idAlumno)
  @JoinColumn()
  alumnos: Alumno;
}
  


 