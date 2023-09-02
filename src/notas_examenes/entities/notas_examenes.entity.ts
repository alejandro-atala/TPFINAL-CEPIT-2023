import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

import { Materia } from 'src/materia/entities/materia.entity'; 

@Entity()
export class NotaExamen {

  @PrimaryGeneratedColumn()
  public idNota: number;

  @Column()
  public idAlumno: number;

  @Column()
  public nombre: string;

  @Column()
  public anio: string;

  @Column()
  public fechaNota: Date;

  @Column()
  public nota: number;

  @Column()
  public trimestre: number;

  // @Column({ nullable: true })
  // public fechaRecuperatorio :Date;

  // @Column({ nullable: true })
  // public notaRecuperatorio :number;



 
  @ManyToOne(() => Materia, materia => materia.notasExamenes)
  materia: Materia[];
  // Otros atributos y métodos si es necesario
} 
   