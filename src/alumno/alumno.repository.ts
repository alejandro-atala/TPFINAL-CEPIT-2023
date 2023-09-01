import { EntityRepository, Repository } from 'typeorm';
import { Alumno } from './entities/alumno.entity';

@EntityRepository(Alumno)
export class AlumnoRepository extends Repository<Alumno> {
  // Aquí puedes agregar métodos específicos para consultas relacionadas con Alumno si es necesario
}
