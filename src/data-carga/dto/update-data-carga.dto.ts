import { PartialType } from '@nestjs/mapped-types';
import { CreateDataCargaDto } from './create-data-carga.dto';

export class UpdateDataCargaDto extends PartialType(CreateDataCargaDto) {}
