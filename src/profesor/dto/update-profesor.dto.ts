import { PartialType } from '@nestjs/mapped-types';
import { CreateProfesorDto } from './create-profesor.dto';

export class UpdateProfesorDto extends PartialType(CreateProfesorDto) {

    public idProfesor?: number;
    public nombreProfesor?: string;
    public dniProfesor?: number;
    public fechaNacProfesor?: number; 
    public nroLegajoProfesor?: number;
    public direccionProfesor?: string;
}
