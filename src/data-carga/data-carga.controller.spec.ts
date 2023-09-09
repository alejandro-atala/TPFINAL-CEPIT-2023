import { Test, TestingModule } from '@nestjs/testing';
import { DataCargaController } from './data-carga.controller';
import { DataCargaService } from './data-carga.service';

describe('DataCargaController', () => {
  let controller: DataCargaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DataCargaController],
      providers: [DataCargaService],
    }).compile();

    controller = module.get<DataCargaController>(DataCargaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
