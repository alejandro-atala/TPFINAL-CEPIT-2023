import { Test, TestingModule } from '@nestjs/testing';
import { UploadController } from './data-carga.controller';
import { DataCargaService } from './data-carga.service';

describe('DataCargaController', () => {
  let controller: UploadController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UploadController],
      providers: [DataCargaService],
    }).compile();

    controller = module.get<UploadController>(UploadController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
