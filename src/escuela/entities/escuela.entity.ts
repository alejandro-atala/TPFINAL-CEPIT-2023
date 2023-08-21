import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany } from 'typeorm';
import { Usuario } from 'src/usuario/entities/usuario.entity'; 
import { Curso } from 'src/curso/entities/curso.entity'; 

@Entity()
export class Escuela {
  @PrimaryGeneratedColumn()
  idEscuela: number;

  @OneToMany(() => Usuario, usuario => usuario.idUsuario)
  usuarios: Usuario[];

  @OneToMany(() => Curso, curso => curso.idCurso)
  cursos: Curso[];
}