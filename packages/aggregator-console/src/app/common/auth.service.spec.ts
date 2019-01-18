import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { OAuthService } from 'angular-oauth2-oidc';
import { oauthServiceStub } from './testing-helpers';

describe('AuthService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        {
          provide: OAuthService,
          useValue: oauthServiceStub,
        },
      ],
    }),
  );

  it('should be created', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
  });
});
