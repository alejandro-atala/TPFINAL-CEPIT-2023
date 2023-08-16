import { Test, TestingModule } from '@nestjs/testing';
import { AlumnoCursoController } from './alumno-curso.controller';
import { AlumnoCursoService } from './alumno-curso.service';

describe('AlumnoCursoController', () => {
  let controller: AlumnoCursoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AlumnoCursoController],
      providers: [AlumnoCursoService],
    }).compile();

    controller = module.get<AlumnoCursoController>(AlumnoCursoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
