import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { Curso } from 'src/curso/entities/curso.entity';  // Asegúrate de importar correctamente
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Entity()
export class Alumno {
  @PrimaryGeneratedColumn()
  idAlumno: number;

  @Column()
  nombre: string;

  @Column()
  usuarioId: number;

  @Column()
  curso: number;

  @OneToOne(() => Usuario, usuario => usuario.alumno)
  @JoinColumn({ name: 'usuarioId' })
  usuario: number;


  @ManyToOne(() => Curso, curso => curso.alumnos)
  @JoinColumn({ name: 'curso' })
  cursoIdCurso: number;



}


