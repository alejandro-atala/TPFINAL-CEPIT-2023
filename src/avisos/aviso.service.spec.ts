import { Test, TestingModule } from '@nestjs/testing';
import { AvisosService } from './aviso.service';

describe('AvisosService', () => {
  let service: AvisosService;

  const mockAvisosRepository = {
    // Define aquí las funciones necesarias para tu mock de repositorio
    // Por ejemplo: create, save, find, findOne, update, remove, etc.
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AvisosService,
        {
          provide: 'AvisosRepository', // Debes proporcionar el nombre del repositorio utilizado en AvisosService
          useValue: mockAvisosRepository,
        },
      ],
    }).compile();

    service = module.get<AvisosService>(AvisosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Agrega aquí tus pruebas para los métodos de AvisosService
  describe('createAviso', () => {
    it('should create a new aviso', async () => {
      // Define tu prueba para el método createAviso aquí
    });
  });

  describe('findAvisos', () => {
    it('should return an array of avisos', async () => {
      // Define tu prueba para el método findAvisos aquí
    });
  });

  // Agrega pruebas para otros métodos de AvisosService según sea necesario
});
