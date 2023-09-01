import { Test, TestingModule } from '@nestjs/testing';
import { ProfesorMateriasService } from './profesor-materias.service';

describe('ProfesorMateriasService', () => {
  let service: ProfesorMateriasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProfesorMateriasService],
    }).compile();

    service = module.get<ProfesorMateriasService>(ProfesorMateriasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
