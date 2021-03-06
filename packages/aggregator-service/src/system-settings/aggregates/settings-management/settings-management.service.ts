import { Settings } from '../../entities/settings/settings.interface';
import { Injectable, HttpService } from '@nestjs/common';
import { Observable, from, of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { SettingsService } from '../../../system-settings/entities/settings/settings.service';

@Injectable()
export class SettingsManagementService {
  constructor(
    private readonly serverSettingsService: SettingsService,
    private readonly http: HttpService,
  ) {}

  find(): Observable<Settings> {
    const settings = this.serverSettingsService.find();
    return from(settings);
  }

  update(query, params) {
    return this.find().pipe(
      switchMap(settings => {
        let baseEncodedCred: string;
        if (settings.clientSecret !== params.clientSecret) {
          baseEncodedCred = Buffer.from(
            settings.clientId + ':' + params.clientSecret,
          ).toString('base64');
          return this.http
            .post(
              settings.authServerURL + '/client/v1/verify_changed_secret',
              null,
              { headers: { Authorization: 'Basic ' + baseEncodedCred } },
            )
            .pipe(
              catchError((err, caught) => {
                return of(err);
              }),
              switchMap(data => {
                if (data.response && data.response.status > 299) {
                  // TODO: notify error
                  return of({});
                } else {
                  return from(this.serverSettingsService.update(query, params));
                }
              }),
            );
        } else {
          return from(this.serverSettingsService.update(query, params));
        }
      }),
    );
  }
}
