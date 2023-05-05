import { Test, TestingModule } from '@nestjs/testing';
import { CapituloService } from './capitulo.service';

describe('CapituloService', () => {
  let service: CapituloService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CapituloService],
    }).compile();

    service = module.get<CapituloService>(CapituloService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
