import { IncomingMessage, ServerResponse } from 'node:http';

export type RequestHandler = (req: IncomingMessage, res: ServerResponse, next: () => void) => void;

export type Route = {
  method: string;
  path: string;
  handler: RequestHandler;
};
