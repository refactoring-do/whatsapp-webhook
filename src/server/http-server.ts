import { IncomingMessage, ServerResponse, createServer } from 'http';

import { RequestHandler, Route } from './types';

export class HttpServer {
  private routes: Route[] = [];

  public use(handler: RequestHandler) {
    this.routes.push({ method: 'USE', path: '', handler });
  }

  public get(path: string, handler: RequestHandler) {
    this.routes.push({ method: 'GET', path, handler });
  }

  public post(path: string, handler: RequestHandler) {
    this.routes.push({ method: 'POST', path, handler });
  }

  public listen(port: number, callback?: () => void) {
    const server = createServer((req: IncomingMessage, res: ServerResponse) => {
      console.log(req.url);
      const matchingRoutes = this.routes.filter(
        (route) =>
          (route.path === req.url?.substring(0, route.path.length) || route.path === '*') &&
          (route.method === req.method || route.method === 'USE'),
      );

      let currentRoute = 0;

      const next = () => {
        currentRoute++;
        if (currentRoute < matchingRoutes.length) {
          matchingRoutes[currentRoute].handler(req, res, next);
        }
      };

      if (matchingRoutes.length > 0) {
        matchingRoutes[currentRoute].handler(req, res, next);
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ statusCode: 404, message: 'Resource not found' }));
      }
    });

    server.listen(port, callback);
  }
}
