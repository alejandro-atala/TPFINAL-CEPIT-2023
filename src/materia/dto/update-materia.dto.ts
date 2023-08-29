import { PartialType } from '@nestjs/mapped-types';
import { CreateMateriaDto } from './create-materia.dto';

export class UpdateMateriaDto extends PartialType(CreateMateriaDto) {
    
    public idMateria?: number;
    public nombre?: string;
    public diaHora? :string;
    public anio?: string;
}
