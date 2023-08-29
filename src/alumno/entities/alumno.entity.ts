import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { Curso } from 'src/curso/entities/curso.entity';  // Asegúrate de importar correctamente
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Entity()
export class Alumno {
  @PrimaryGeneratedColumn()
  idAlumno: number;

  @Column()
  nombre: string;

  @ManyToOne(() => Curso, curso => curso.alumnos)
  curso: Curso;
  notasExamenes: any;

  @OneToOne(() => Usuario, usuario => usuario.idUsuario) 
  @JoinColumn({ name: 'usuario_id' })
  usuarios: Usuario;  
} 

// import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
// import { Curso } from 'src/curso/entities/curso.entity';
// import { Asistencia } from 'src/asistencia/entities/asistencia.entity';

// @Entity()
// export class Alumno {
//   @PrimaryGeneratedColumn()
//   idAlumno: number;

//   @Column()
//   nombre: string;

//   @ManyToOne(() => Curso, curso => curso.alumnos)
//   curso: Curso;

//   @OneToMany(() => Asistencia, asistencia => asistencia.alumno)
//   asistencias: Asistencia[];
// }
