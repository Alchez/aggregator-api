import { Test, TestingModule } from '@nestjs/testing';
import { RequestAggregationSaga } from './request-aggregation-saga.service';

describe('RequestAggregationSaga', () => {
  let service: RequestAggregationSaga;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RequestAggregationSaga],
    }).compile();

    service = module.get<RequestAggregationSaga>(RequestAggregationSaga);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
