import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn, ManyToMany, ManyToOne } from 'typeorm';
import { Materia } from 'src/materia/entities/materia.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Curso } from 'src/curso/entities/curso.entity';

@Entity()
export class Profesor {
  @PrimaryGeneratedColumn()
  idProfesor: number;

  @Column()
  nombre: string;

  @Column()
  usuarioId: number;

  @ManyToMany(() => Curso, (curso) => curso.profesores)
  cursos: Curso[];

  @OneToMany(() => Materia, materia => materia.idMateria)
  materias: Materia[];

  // @Column()
  // usuarioId: number;



  @OneToOne(() => Usuario, usuario => usuario.idUsuario)
  @JoinColumn({ name: 'usuarioId' })
  usuario: number;

  
  // @ManyToOne(() => Curso, curso => curso.alumnos)
  // curso: number;

} 
