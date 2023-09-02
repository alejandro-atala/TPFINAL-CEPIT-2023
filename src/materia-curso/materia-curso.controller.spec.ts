import { Test, TestingModule } from '@nestjs/testing';
import { MateriasCursoController } from './materia-curso.controller';
import { MateriasCursoService } from './materia-curso.service';

describe('MateriaCursoController', () => {
  let controller: MateriasCursoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MateriasCursoController],
      providers: [MateriasCursoService],
    }).compile();

    controller = module.get<MateriasCursoController>(MateriasCursoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
