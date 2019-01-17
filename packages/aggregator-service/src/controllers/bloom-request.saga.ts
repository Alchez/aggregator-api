import { Injectable } from '@nestjs/common';
import { EventObservable, ICommand } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { ClientRequestFiredEvent } from '../events/client-request-fired/client-request-fired.event';
// import { map } from "rxjs/operators";

@Injectable()
export class BloomRequestSagas {
  requestFired(events$: EventObservable<any>): Observable<ICommand> {
    return events$.ofType(ClientRequestFiredEvent);
    // .pipe(
    //     map((event) => {console.log(event); return event}),
    // );
  }
}
