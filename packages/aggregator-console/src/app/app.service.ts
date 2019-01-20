import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Injectable()
export class AppService {
  messageUrl = '/info'; // URL to web api
  constructor(private http: HttpClient) {}

  /** GET message from the server */
  getMessage(): Observable<any> {
    return this.http.get<any>(this.messageUrl).pipe(
      switchMap(appInfo => {
        return this.http.get<any>(appInfo.authServerURL + '/info').pipe(
          map(authInfo => {
            appInfo.services = authInfo.services;
            return appInfo;
          }),
        );
      }),
    );
  }
}
