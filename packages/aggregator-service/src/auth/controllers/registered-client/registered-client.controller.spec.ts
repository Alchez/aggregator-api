import { Test, TestingModule } from '@nestjs/testing';
import { RegisteredClientController } from './registered-client.controller';
import { TokenGuard } from '../../guards/token.guard';
import { RoleGuard } from '../../guards/role.guard';
import { RegisteredClientService } from '../../entities/registered-client/registered-client.service';
import { PaginateService } from '../../../common/aggregates/paginate/paginate.service';

describe('RegisteredClient Controller', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [RegisteredClientController],
      providers: [
        {
          provide: RegisteredClientService,
          useValue: {},
        },
        {
          provide: PaginateService,
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
    const controller: RegisteredClientController = module.get<
      RegisteredClientController
    >(RegisteredClientController);
    expect(controller).toBeDefined();
  });
});
