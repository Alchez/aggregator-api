import { Test, TestingModule } from '@nestjs/testing';
import { SettingsService } from './settings.service';
import { HttpModule } from '@nestjs/common';

describe('SettingsService', () => {
  let service: SettingsService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        SettingsService,
        {
          provide: SettingsService,
          useValue: {},
        },
      ],
    }).compile();
    service = module.get<SettingsService>(SettingsService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
