import { Test, TestingModule } from '@nestjs/testing';
import { ClientRegistrationService } from './client-registration.service';
import { HttpService } from '@nestjs/common';
import { RegisteredClientService } from '../../entities/registered-client/registered-client.service';
import { SettingsService } from '../../../system-settings/entities/settings/settings.service';

describe('ClientRegistrationService', () => {
  let service: ClientRegistrationService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientRegistrationService,
        {
          provide: HttpService,
          useValue: {},
        },
        {
          provide: RegisteredClientService,
          useValue: {},
        },
        {
          provide: SettingsService,
          useValue: {},
        },
      ],
    }).compile();
    service = module.get<ClientRegistrationService>(ClientRegistrationService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
