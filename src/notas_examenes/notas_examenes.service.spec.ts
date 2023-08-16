import { Test, TestingModule } from '@nestjs/testing';
import { NotasExamenesService } from './notas_examenes.service';

describe('NotasExamenesService', () => {
  let service: NotasExamenesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotasExamenesService],
    }).compile();

    service = module.get<NotasExamenesService>(NotasExamenesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
