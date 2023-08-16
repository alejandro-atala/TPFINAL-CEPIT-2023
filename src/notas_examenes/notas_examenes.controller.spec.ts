import { Test, TestingModule } from '@nestjs/testing';
import { NotasExamenesController } from './notas_examenes.controller';
import { NotasExamenesService } from './notas_examenes.service';

describe('NotasExamenesController', () => {
  let controller: NotasExamenesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotasExamenesController],
      providers: [NotasExamenesService],
    }).compile();

    controller = module.get<NotasExamenesController>(NotasExamenesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
