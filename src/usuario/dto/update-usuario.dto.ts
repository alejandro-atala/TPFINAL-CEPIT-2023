import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioDto } from './create-usuario.dto';

export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {

    public idusuario?: number;
    public nombre?: string;
    public dni?: number;
    public fechaNac? :Date;
    public direccion?: string;
    public telefono?: number;
    public email? :string;
    public password?: string;
    public tipo ?:string;
}
