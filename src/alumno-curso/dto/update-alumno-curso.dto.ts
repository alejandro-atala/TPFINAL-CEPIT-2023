import { PartialType } from '@nestjs/mapped-types';
import { CreateAlumnoCursoDto } from './create-alumno-curso.dto';

export class UpdateAlumnoCursoDto extends PartialType(CreateAlumnoCursoDto) {

    public idAlumno_curso?: number;
}
