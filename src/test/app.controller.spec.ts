import { Test, TestingModule } from '@nestjs/testing';
import { EstacionamentoController } from '../app.controller';
import { EstacionamentoService } from '../app.service';
import { getModelToken } from '@nestjs/mongoose';

describe('EstacionamentoController', () => {
  let controller: EstacionamentoController;

  const mockEstacionamentoModel = {
    create: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EstacionamentoController],
      providers: [
        EstacionamentoService,
        {
          provide: getModelToken('Estacionamento'),
          useValue: mockEstacionamentoModel,
        },
      ],
    }).compile();

    controller = module.get<EstacionamentoController>(EstacionamentoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
