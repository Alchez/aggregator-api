import { Injectable } from '@nestjs/common';
import { EventObservable, ICommand } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { ClientRequestFiredEvent } from '../../events/client-request-fired/client-request-fired.event';
import { map } from 'rxjs/operators';
import { NotifyClientCommand } from '../../commands/notify-client/notify-client.command';

@Injectable()
export class RequestAggregationSaga {
  clientRequestFired = (
    events$: EventObservable<any>,
  ): Observable<ICommand> => {
    return events$.ofType(ClientRequestFiredEvent).pipe(
      map((event: ClientRequestFiredEvent) => {
        return new NotifyClientCommand(event.clientId, event.queueId);
      }),
    );
  }; // tslint:disable-line
}
