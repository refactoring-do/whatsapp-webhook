import { IncomingMessage, ServerResponse } from 'node:http';

import { ReceivedMessage } from './interfaces/received-message.interface';
import { WebhookOptions } from './interfaces';
import { MessageProccesor } from './utils';
import { HttpServer } from '../server';
import { Logger } from '../logger';

export class Webhook {
  constructor(private readonly options: WebhookOptions) {}

  async run() {
    const server = new HttpServer();

    server.get(this.options.endpoint, (req: IncomingMessage, res: ServerResponse) => {
      Logger.log('Entro');
      const requestPath = new URL(req.url as string, `https://${req.headers.host}`);

      const verifyToken = requestPath.searchParams.get('hub.verify_token');
      const challenge = requestPath.searchParams.get('hub.challenge');

      if (verifyToken && verifyToken === this.options.verificationToken) {
        res.write(challenge);
        Logger.log('Cloud API Token has been successfully verified.');
      } else {
        res.writeHead(400);
      }

      return res.end();
    });

    server.post(this.options.endpoint, (req: IncomingMessage, res: ServerResponse) => {
      let body: any = '';

      req.on('data', (chunk: any) => {
        body += chunk.toString();
      });

      req.on('end', () => {
        body = JSON.parse(body);

        const isInvalidMessage = !body.object || !body.entry?.[0]?.changes?.[0]?.value;

        if (isInvalidMessage) {
          res.writeHead(400);
          return res.end();
        }

        const isStatusMessage = body?.entry?.[0]?.changes?.[0]?.value?.statuses;

        if (isStatusMessage) {
          res.writeHead(202);
          return res.end();
        }

        Logger.log('New message received');

        const receivedMessage = body as ReceivedMessage;
        const proccessedMessage = MessageProccesor.process(receivedMessage);

        this.options.observer(proccessedMessage);

        res.writeHead(200);
        return res.end();
      });
    });

    return new Promise((resolve) => {
      server.listen(this.options.port, () => {
        resolve(`Webhook is running on port ${this.options.port}`);
      });
    });
  }
}
