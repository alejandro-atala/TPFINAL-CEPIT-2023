import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { Materia } from 'src/materia/entities/materia.entity'; 
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Entity()
export class Profesor {
  @PrimaryGeneratedColumn()
  idProfesor: number;

  @Column()
  nombre :string;


  @OneToMany(() => Materia, materia => materia.idMateria)
  materias: Materia[];

  @Column() // Indica que esta columna no puede ser nula
  usuarioId: number;

  @OneToOne(() => Usuario, usuario => usuario.tipo)
  @JoinColumn({ name: 'usuarioId' })
  usuario: Usuario;
} 
