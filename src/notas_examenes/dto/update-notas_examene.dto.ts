import { PartialType } from '@nestjs/mapped-types';
import { CreateNotasExameneDto } from './create-notas_examene.dto';

export class UpdateNotasExameneDto extends PartialType(CreateNotasExameneDto) {

    public idNota?: number;
    public nota?: number;
    public fechaNota?: number;
}
