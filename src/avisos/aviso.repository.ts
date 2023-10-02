import { EntityRepository, Repository } from 'typeorm';
import { Aviso } from './entities/aviso.entity'; // Asegúrate de importar la entidad Aviso correctamente

@EntityRepository(Aviso)
export class AvisoRepository extends Repository<Aviso> {
  // Agrega métodos personalizados para consultas relacionadas con Aviso si es necesario
}