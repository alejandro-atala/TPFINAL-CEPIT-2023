import { EntityRepository, Repository } from 'typeorm';
import { Curso } from './entities/curso.entity';

@EntityRepository(Curso)
export class CursoRepository extends Repository<Curso> {
  // Aquí puedes agregar métodos específicos para consultas relacionadas con Curso si es necesario
}
