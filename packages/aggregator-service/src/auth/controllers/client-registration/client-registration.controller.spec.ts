import { Test, TestingModule } from '@nestjs/testing';
import { ClientRegistrationController } from './client-registration.controller';
import { TokenGuard } from '../../guards/token.guard';
import { RoleGuard } from '../../guards/role.guard';
import { ClientRegistrationService } from '../../aggregates/client-registration/client-registration.service';

describe('ClientRegistration Controller', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [ClientRegistrationController],
      providers: [
        {
          provide: ClientRegistrationService,
          useValue: {},
        },
      ],
    })
      .overrideGuard(TokenGuard)
      .useValue({})
      .overrideGuard(RoleGuard)
      .useValue({})
      .compile();
  });
  it('should be defined', () => {
    const controller: ClientRegistrationController = module.get<
      ClientRegistrationController
    >(ClientRegistrationController);
    expect(controller).toBeDefined();
  });
});
