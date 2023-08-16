import { PartialType } from '@nestjs/mapped-types';
import { CreateRolDto } from './create-rol.dto';

export class UpdateRolDto extends PartialType(CreateRolDto) {

    public idRol?: number;
    public administrador?: boolean;
    public usuario?: boolean;
}
