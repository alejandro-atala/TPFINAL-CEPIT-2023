import { PartialType } from '@nestjs/mapped-types';
import { CreateAlumnoAvisoDto } from './create-alumno-aviso.dto';

export class UpdateAlumnoAvisoDto extends PartialType(CreateAlumnoAvisoDto) {

    public idAlumno_curso?: number;
}
