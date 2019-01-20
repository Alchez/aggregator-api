import { Test, TestingModule } from '@nestjs/testing';
import { SettingsManagementService } from './settings-management.service';
import { HttpModule } from '@nestjs/common';
import { SettingsService } from '../../models/settings/settings.service';

describe('SettingsManagementService', () => {
  let service: SettingsManagementService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        SettingsManagementService,
        {
          provide: SettingsService,
          useValue: {},
        },
      ],
    }).compile();
    service = module.get<SettingsManagementService>(SettingsManagementService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
