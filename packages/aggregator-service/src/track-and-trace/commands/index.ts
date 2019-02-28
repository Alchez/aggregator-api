import { FireRequestHandler } from './fire-request/fire-request.handler';
import { NotifyClientHandler } from './notify-client/notify-client.handler';
import { FireGetRequestHandler } from './fire-get-request/fire-get-request.handler';

export const TrackAndTraceCommands = [
  FireRequestHandler,
  NotifyClientHandler,
  FireGetRequestHandler,
];
