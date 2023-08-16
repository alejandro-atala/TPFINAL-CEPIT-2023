import { Test, TestingModule } from '@nestjs/testing';
import { MateriaCursoController } from './materia_curso.controller';
import { MateriaCursoService } from './materia_curso.service';

describe('MateriaCursoController', () => {
  let controller: MateriaCursoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MateriaCursoController],
      providers: [MateriaCursoService],
    }).compile();

    controller = module.get<MateriaCursoController>(MateriaCursoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
