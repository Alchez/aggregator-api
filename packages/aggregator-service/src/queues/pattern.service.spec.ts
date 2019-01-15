import { Test, TestingModule } from '@nestjs/testing';
import { MicroservicePatternService } from './pattern.service';

describe('MicroservicePatternService', () => {
  let service: MicroservicePatternService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: MicroservicePatternService,
          useValue: {},
        },
      ],
    }).compile();
    service = module.get<MicroservicePatternService>(
      MicroservicePatternService,
    );
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
