import { Test, TestingModule } from '@nestjs/testing';
import { ProfesorMateriasController } from './profesor-materias.controller';
import { ProfesorMateriasService } from './profesor-materias.service';

describe('ProfesorMateriasController', () => {
  let controller: ProfesorMateriasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfesorMateriasController],
      providers: [ProfesorMateriasService],
    }).compile();

    controller = module.get<ProfesorMateriasController>(ProfesorMateriasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
