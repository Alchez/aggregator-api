import { Document } from 'mongoose';

export interface Settings extends Document {
  type?: string;
  uuid?: string;
  appURL?: string;
  authServerURL?: string;
  clientId?: string;
  clientSecret?: string;
  profileURL?: string;
  tokenURL?: string;
  introspectionURL?: string;
  authorizationURL?: string;
  callbackURLs?: string[];
  revocationURL?: string;
}
