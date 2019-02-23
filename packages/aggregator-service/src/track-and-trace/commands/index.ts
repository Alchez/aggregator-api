import { FireRequestHandler } from './fire-request/fire-request.handler';
import { NotifyClientHandler } from './notify-client/notify-client.handler';

export const TrackAndTraceCommands = [FireRequestHandler, NotifyClientHandler];
