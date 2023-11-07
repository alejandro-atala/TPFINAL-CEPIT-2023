import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { Alumno } from 'src/alumno/entities/alumno.entity';
import { Profesor } from 'src/profesor/entities/profesor.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Aviso } from 'src/avisos/entities/aviso.entity';
import { AlumnoAviso } from 'src/alumno-aviso/entities/alumno-aviso.entity';
import { Message } from 'src/message/entities/message.entity';


@Entity()
export class Usuario {

  @ApiProperty({
    type: Number,
    description: 'This is a required property',
  })
  @PrimaryGeneratedColumn()
  idUsuario: number;


  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @Column()
  nombre: string;


  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @Column()
  dni: string;


  @ApiProperty({
    type: Date,
    description: 'This is a required property',
  })
  @Column({ type: 'date'  })
  fechaNac: Date;


  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @Column()
  direccion: string;


  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @Column()
  telefono: string;


  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @Column()
  email: string;


  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @Column()
  password: string; 


  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @Column()
  tipo: string;


  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @Column()
  curso: string;

  @OneToOne(() => Alumno, alumno => alumno.idAlumno) // Define the relationship 
  alumno: Alumno; 

  @OneToOne(() => Profesor, profesor => profesor.idProfesor) // Define the relationship
  profesor: Profesor; 

  @OneToMany(type => Message, message => message.sender)
  sentMessages: Message[];
  
  @OneToMany(type => Message, message => message.receiver)
  receivedMessages: Message[];

} 
