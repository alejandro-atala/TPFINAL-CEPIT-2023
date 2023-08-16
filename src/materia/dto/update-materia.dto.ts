import { PartialType } from '@nestjs/mapped-types';
import { CreateMateriaDto } from './create-materia.dto';

export class UpdateMateriaDto extends PartialType(CreateMateriaDto) {
    
    public idMateria?: number;
    public nombreMateria?: string;
    public horarioMateria?: number;
}
