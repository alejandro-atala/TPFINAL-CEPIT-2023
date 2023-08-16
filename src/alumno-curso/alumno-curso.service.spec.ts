import { Test, TestingModule } from '@nestjs/testing';
import { AlumnoCursoService } from './alumno-curso.service';

describe('AlumnoCursoService', () => {
  let service: AlumnoCursoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AlumnoCursoService],
    }).compile();

    service = module.get<AlumnoCursoService>(AlumnoCursoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
