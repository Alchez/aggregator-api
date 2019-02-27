import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '../common/storage.service';
import { AGGREGATOR_SERVICE } from '../constants/storage';
import { AuthService } from '../common/auth.service';

@Injectable()
export class ClientService {
  constructor(
    private readonly auth: AuthService,
    private readonly http: HttpClient,
    private storageService: StorageService,
  ) {}

  getClient(clientId: string): Observable<any> {
    const serviceURL = this.storageService.getServiceUrlByType(
      AGGREGATOR_SERVICE,
    );
    const url = `${serviceURL}/registered-client/v1/get/${clientId}`;
    return this.http.get<any>(url, { headers: this.auth.headers });
  }

  registerClient<T>(
    clientId: string,
    webhookURL: string,
    userKey: string,
    licenseNumber: string,
  ) {
    const serviceURL = this.storageService.getServiceUrlByType(
      AGGREGATOR_SERVICE,
    );

    return this.http.post<T>(
      `${serviceURL}/client-registration/register/${clientId}`,
      { webhookURL, userKey, licenseNumber },
      { headers: this.auth.headers },
    );
  }

  updateClientRegistration(
    clientId: string,
    webhookURL: string,
    userKey: string,
    licenseNumber: string,
  ) {
    const serviceURL = this.storageService.getServiceUrlByType(
      AGGREGATOR_SERVICE,
    );
    return this.http.put<any>(
      `${serviceURL}/registered-client/v1/update/${clientId}`,
      { webhookURL, userKey, licenseNumber },
      { headers: this.auth.headers },
    );
  }
}
