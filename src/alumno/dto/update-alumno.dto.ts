import { PartialType } from '@nestjs/mapped-types';
import { CreateAlumnoDto } from './create-alumno.dto';

export class UpdateAlumnoDto extends PartialType(CreateAlumnoDto) {

    // no se para que sirven los ? pero los pongo
    public idAlumno?: number;
    public nombreAlmuno?: string;
    public dniAlumno?: number;
    public fechaNacAlumno?: number; 
    public nroLegajoAlumno?: number;
    public direccionAlumno?: string;
}
