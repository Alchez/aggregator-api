import { Test, TestingModule } from '@nestjs/testing';
import { ClientRegistrationController } from './client-registration.controller';
import { ClientRegistrationService } from './client-registration.service';
import { TokenGuard } from '../../gaurds/token.guard';
import { RoleGuard } from '../../gaurds/role.guard';

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
