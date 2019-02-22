import { Test, TestingModule } from '@nestjs/testing';
import { SetupService } from './setup.service';
import { HttpService } from '@nestjs/common';
import { SettingsService } from '../../entities/settings/settings.service';

describe('SetupService', () => {
  let service: SetupService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SetupService,
        {
          provide: SettingsService,
          useValue: {},
        },
        {
          provide: HttpService,
          useValue: {},
        },
      ],
    }).compile();
    service = module.get<SetupService>(SetupService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
