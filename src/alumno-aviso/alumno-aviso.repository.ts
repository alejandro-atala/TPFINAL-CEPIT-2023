// alumno-aviso.repository.ts

import { EntityRepository, Repository } from 'typeorm';
import { AlumnoAviso } from './entities/alumno-aviso.entity';

@EntityRepository(AlumnoAviso)
export class AlumnoAvisoRepository extends Repository<AlumnoAviso> {}
