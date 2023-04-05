import { Request, Response } from 'express';

import { ReceivedMessage } from './interfaces/received-message.interface';
import { WebhookOptions } from './interfaces';
import { MessageProccesor } from './utils';
import { Server } from '../server/server';
import { Logger } from '../logger';

export class Webhook {
  constructor(private readonly options: WebhookOptions) {}

  async run() {
    const server = new Server();

    server.instance.get(this.options.endpoint, (req: Request, res: Response) => {
      const verifyToken = req.query['hub.verify_token'];
      const challenge = req.query['hub.challenge'];

      if (verifyToken && verifyToken === this.options.verificationToken) {
        return res.status(200).send(challenge);
      }

      Logger.log('Cloud API Token has been successfully verified.');

      return res.sendStatus(400);
    });

    server.instance.post(this.options.endpoint, (req: Request, res: Response) => {
      const isInvalidMessage = !req.body.object || !req.body.entry?.[0]?.changes?.[0]?.value;

      if (isInvalidMessage) {
        return res.sendStatus(400);
      }

      const isStatusMessage = req.body?.entry?.[0]?.changes?.[0]?.value?.statuses;

      if (isStatusMessage) {
        return res.sendStatus(202);
      }

      Logger.log('New message received');

      const receivedMessage = req.body as ReceivedMessage;
      const proccessedMessage = MessageProccesor.process(receivedMessage);

      this.options.observer(proccessedMessage);

      return res.sendStatus(200);
    });

    return new Promise((resolve) => {
      server.instance.listen(this.options.port, () => {
        resolve(`Webhook is running on port ${this.options.port}`);
      });
    });
  }
}
