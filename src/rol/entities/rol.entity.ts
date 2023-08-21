import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne } from 'typeorm';
import { Usuario } from 'src/usuario/entities/usuario.entity'; 

@Entity()
export class Rol {
  @PrimaryGeneratedColumn()
  idRol: number;

  @OneToOne(() => Usuario, usuario => usuario.idUsuario)
  usuarios: Usuario[];

  // Otros atributos y métodos de la entidad Rol
}
