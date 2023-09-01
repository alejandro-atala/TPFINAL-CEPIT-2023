import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Curso } from '../../curso/entities/curso.entity'; // Importa la entidad Curso
import { Profesor } from '../../profesor/entities/profesor.entity'; // Importa la entidad Profesor

@Entity()
export class CursoProfesor {
  @PrimaryColumn({ type: 'int' })
  Curso_idCurso: number;

  @PrimaryColumn({ type: 'int' })
  Profesor_idProfesor: number;

  @ManyToOne(() => Curso, (curso) => curso.anio)
  @JoinColumn({ name: 'Curso_idCurso' })
  curso: Curso;

  @ManyToOne(() => Profesor, (profesor) => profesor.nombre)
  @JoinColumn({ name: 'Profesor_idProfesor' })
  profesor: Profesor;
}
