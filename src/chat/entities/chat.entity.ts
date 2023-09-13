// message.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Usuario } from '../../usuario/entities/usuario.entity'; // Asumiendo que tienes una entidad de usuario

@Entity()
export class Chat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;


  @Column()
  idAlumno: number;

  @Column()
  idProfesor: number;

  // Puedes agregar más campos, como timestamps, si es necesario
}
 