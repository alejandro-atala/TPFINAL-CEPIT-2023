import { Test, TestingModule } from '@nestjs/testing';
import { DataCargaService } from './data-carga.service';

describe('DataCargaService', () => {
  let service: DataCargaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataCargaService],
    }).compile();

    service = module.get<DataCargaService>(DataCargaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
