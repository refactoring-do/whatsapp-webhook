# WhatsApp Cloud API Webhook

<p align="center">
<img src="./assets/logo.svg" width="300" alt="@refactoring-do/whatsapp-webhook" />
</p>

WhatsApp Cloud API Webhook for message subscriptions.

[![NPM Package](https://github.com/refactoring-do/whatsapp-webhook/actions/workflows/publish-package-npm.yml/badge.svg)](https://github.com/refactoring-do/whatsapp-webhook/blob/main/.github/workflows/publish-package-npm.yml)
[![Tests](https://github.com/refactoring-do/whatsapp-webhook/actions/workflows/tests.yml/badge.svg)](https://github.com/refactoring-do/whatsapp-webhook/blob/main/.github/workflows/tests.yml)
[![Linting and Formatting](https://github.com/refactoring-do/whatsapp-webhook/actions/workflows/lint-format.yml/badge.svg)](https://github.com/refactoring-do/whatsapp-webhook/blob/main/.github/workflows/lint-format.yml)

## Getting started

1. Install dependecy

    ```sh
    npm install @refactoring/whatsapp-webhook
    ```

2. Write the following code:

    ```js
    import { Logger, Webhook, ProcessedMessage } from "@refactoring/whatsapp-webhook";

    const observer = (message: any) => {
      console.log(JSON.stringify(message));
    };

    const port = +process.env['PORT'] || 3000;
    const verificationToken = process.env['VERIFICATION_TOKEN'] || 'qwertyuiop1234567890';

    (async () => {
      const webhook = new Webhook({
        endpoint: '/webhook',
        port,
        verificationToken,
        observer,
      });

      webhook.run().then(Logger.log).catch(Logger.error);
    })();
    ```

3. Run the code

    ```sh
      node webhook.js
    ```

4. Output

    The server is listening on the provided port and ready to verify the WhatsApp Cloud API token and receive messages.

## Debuggin

1. Install cloudflared CLI:

    ```sh
    brew install cloudflared
    ```

2. Run instance with a Cloudflare tunnel:

    ```sh
    cloudflared tunnel --url localhost:3000   
    ```

3. Write message to the bot and wait for the webhook subscription.

### Credits

This package has been inspired by the [official WhatsApp Cloud API for Node.js](https://github.com/WhatsApp/WhatsApp-Nodejs-SDK). A few improvements and facilities have been added.

Made with ❤️ by [Refactoring, SRL](https://refactoring.do)
