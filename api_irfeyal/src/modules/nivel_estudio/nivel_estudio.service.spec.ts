import { Test, TestingModule } from '@nestjs/testing';
import { NivelEstudioService } from './nivel_estudio.service';

describe('NivelEstudioService', () => {
  let service: NivelEstudioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NivelEstudioService],
    }).compile();

    service = module.get<NivelEstudioService>(NivelEstudioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
