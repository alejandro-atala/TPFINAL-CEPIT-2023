import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { Curso } from 'src/curso/entities/curso.entity';  // Asegúrate de importar correctamente
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Entity()
export class Alumno {
  @PrimaryGeneratedColumn()
  idAlumno: number;

  @Column()
  nombre: string;

  @ManyToOne(() => Curso, curso => curso.idCurso)
  cursoIdCurso: number;
  
  @Column({ nullable: false }) // Indica que esta columna no puede ser nula
  usuarioId: number;

  @OneToOne(() => Usuario, usuario => usuario.idUsuario) 

  usuarios: Usuario;  
} 


