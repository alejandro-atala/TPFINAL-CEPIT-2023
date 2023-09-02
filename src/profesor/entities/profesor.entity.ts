import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn, ManyToMany } from 'typeorm';
import { Materia } from 'src/materia/entities/materia.entity'; 
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Curso } from 'src/curso/entities/curso.entity';

@Entity()
export class Profesor {
  @PrimaryGeneratedColumn()
  idProfesor: number;

  @Column()
  nombre :string;

  @ManyToMany(() => Curso, (curso) => curso.profesores)
  cursos: Curso[];

  @OneToMany(() => Materia, materia => materia.idMateria)
  materias: Materia[];

  @Column()
  usuarioId: number;

  @OneToOne(() => Usuario, usuario => usuario.tipo)
  @JoinColumn({ name: 'usuarioId' })
  usuario: Usuario;
} 
