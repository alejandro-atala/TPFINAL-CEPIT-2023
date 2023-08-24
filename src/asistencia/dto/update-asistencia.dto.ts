import { PartialType } from '@nestjs/mapped-types';
import { CreateAsistenciaDto } from './create-asistencia.dto';

export class UpdateAsistenciaDto extends PartialType(CreateAsistenciaDto) {

    public idAsistencia?: number;
    public alumno?: string;
    public fechaAsistencia?: Date;
    public asistencia?: string;
}
