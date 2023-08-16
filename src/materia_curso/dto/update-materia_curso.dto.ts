import { PartialType } from '@nestjs/mapped-types';
import { CreateMateriaCursoDto } from './create-materia_curso.dto';

export class UpdateMateriaCursoDto extends PartialType(CreateMateriaCursoDto) {}
