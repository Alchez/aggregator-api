import { Test, TestingModule } from '@nestjs/testing';
import { SettingsController } from './settings.controller';
import { TokenGuard } from '../../guards/token.guard';
import { HttpModule } from '@nestjs/common';
import { SettingsManagementService } from './settings-management.service';

describe('Settings Controller', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [SettingsController],
      providers: [
        {
          provide: SettingsManagementService,
          useValue: {},
        },
      ],
    })
      .overrideGuard(TokenGuard)
      .useValue({})
      .compile();
  });
  it('should be defined', () => {
    const controller: SettingsController = module.get<SettingsController>(
      SettingsController,
    );
    expect(controller).toBeDefined();
  });
});
