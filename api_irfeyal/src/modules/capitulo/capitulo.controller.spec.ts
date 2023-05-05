import { Test, TestingModule } from '@nestjs/testing';
import { CapituloController } from './capitulo.controller';
import { CapituloService } from './capitulo.service';

describe('CapituloController', () => {
  let controller: CapituloController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CapituloController],
      providers: [CapituloService],
    }).compile();

    controller = module.get<CapituloController>(CapituloController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
