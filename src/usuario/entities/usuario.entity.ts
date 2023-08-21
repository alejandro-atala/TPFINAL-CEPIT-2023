import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne } from 'typeorm';
import { Escuela } from 'src/escuela/entities/escuela.entity'; 
import { Rol } from 'src/rol/entities/rol.entity'; 

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  idUsuario: number;

  @ManyToOne(() => Escuela, escuela => escuela.idEscuela)
  escuela: Escuela;

  @OneToOne(() => Rol, rol => rol.idRol)
  rol: Rol;

  // Otros atributos y métodos de la entidad Usuario
}
