import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { AGGREGATOR_SERVICE } from '../constants/storage';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ListingService {
  constructor(
    private storageService: StorageService,
    private http: HttpClient,
    private auth: AuthService,
  ) {}

  findModels(
    model: string,
    filter = '',
    sortOrder = 'asc',
    pageNumber = 0,
    pageSize = 10,
  ) {
    const issuer = this.storageService.getServiceUrlByType(AGGREGATOR_SERVICE);
    const url = `${issuer}/${model}/v1/list`;
    const params = new HttpParams()
      .set('limit', pageSize.toString())
      .set('offset', (pageNumber * pageSize).toString())
      .set('search', filter)
      .set('sort', sortOrder);
    return this.http.get(url, {
      params,
      headers: this.auth.headers,
    });
  }
}
