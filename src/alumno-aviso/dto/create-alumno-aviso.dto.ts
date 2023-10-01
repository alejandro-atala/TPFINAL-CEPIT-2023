import { Column } from 'typeorm';

export class CreateAlumnoAvisoDto {
  @Column()
  avisoIdAviso: number;

  @Column()
  alumnoIdAlumno: number;
}