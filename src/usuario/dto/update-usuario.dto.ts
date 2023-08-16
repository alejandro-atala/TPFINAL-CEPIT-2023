import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioDto } from './create-usuario.dto';

export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {

    public idusuario?: number;
    public nombreUsuario?: string;
    public dniUsuario?: number;
}
