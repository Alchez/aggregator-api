import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AppService {
  messageUrl = '/info'; // URL to web api
  constructor(private http: HttpClient) {}

  /** GET message from the server */
  getMessage(): Observable<any> {
    return this.http.get<string>(this.messageUrl);
  }
}
