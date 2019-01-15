import { Test, TestingModule } from '@nestjs/testing';
import { SetupService } from './setup.service';
import { SettingsService } from '../../../server/models/settings/settings.service';
import { HttpService } from '@nestjs/common';

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
