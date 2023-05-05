import { Test, TestingModule } from '@nestjs/testing';
import { NivelEstudioController } from './nivel_estudio.controller';
import { NivelEstudioService } from './nivel_estudio.service';

describe('NivelEstudioController', () => {
  let controller: NivelEstudioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NivelEstudioController],
      providers: [NivelEstudioService],
    }).compile();

    controller = module.get<NivelEstudioController>(NivelEstudioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
