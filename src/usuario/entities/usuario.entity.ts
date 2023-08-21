import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Escuela } from 'src/escuela/entities/escuela.entity'; 
import { Rol } from 'src/rol/entities/rol.entity'; 

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  idUsuario: number;

  @ManyToOne(() => Escuela, escuela => escuela.usuarios)
  escuela: Escuela;

  @ManyToOne(() => Rol, rol => rol.usuarios)
  rol: Rol;

  // Otros atributos y métodos de la entidad Usuario
}
