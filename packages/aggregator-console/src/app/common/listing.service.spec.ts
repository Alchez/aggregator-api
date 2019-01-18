import { TestBed } from '@angular/core/testing';

import { ListingService } from './listing.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StorageService } from './storage.service';
import { AuthService } from './auth.service';

describe('ListingService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ListingService,
        {
          provide: StorageService,
          useValue: {},
        },
        {
          provide: AuthService,
          useValue: {},
        },
      ],
    }),
  );

  it('should be created', () => {
    const service: ListingService = TestBed.get(ListingService);
    expect(service).toBeTruthy();
  });
});
