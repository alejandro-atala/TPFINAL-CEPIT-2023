import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Usuario } from 'src/usuario/entities/usuario.entity'; 

@Entity()
export class Rol {
  @PrimaryGeneratedColumn()
  idRol: number;

  @OneToMany(() => Usuario, usuario => usuario.rol)
  usuarios: Usuario[];

  // Otros atributos y métodos de la entidad Rol
}
