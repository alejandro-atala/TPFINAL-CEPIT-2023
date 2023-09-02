import { Test, TestingModule } from '@nestjs/testing';
import { MateriasCursoService } from './materia-curso.service';

describe('MateriaService', () => {
  let service: MateriasCursoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MateriasCursoService],
    }).compile();

    service = module.get<MateriasCursoService>(MateriasCursoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
