# WhatsApp Cloud API Webhook

<p align="center">
<img src="./assets/logo.svg" width="300" alt="@refactoring-do/whatsapp-webhook" />
</p>

WhatsApp Cloud API Webhook for message subscriptions.

[![NPM Package](https://github.com/refactoring-do/whatsapp-webhook/actions/workflows/publish-package-npm.yml/badge.svg)](https://github.com/refactoring-do/whatsapp-webhook/blob/main/.github/workflows/publish-package-npm.yml)
[![Tests](https://github.com/refactoring-do/whatsapp-webhook/actions/workflows/tests.yml/badge.svg)](https://github.com/refactoring-do/whatsapp-webhook/blob/main/.github/workflows/tests.yml)
[![Linting and Formatting](https://github.com/refactoring-do/whatsapp-webhook/actions/workflows/lint-format.yml/badge.svg)](https://github.com/refactoring-do/whatsapp-webhook/blob/main/.github/workflows/lint-format.yml)

## Getting Started

Follow these steps to set up the WhatsApp Cloud API Webhook for message subscriptions.

1. Install dependency

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

    The server is now listening on the provided port and is ready to verify the WhatsApp Cloud API token and receive messages.

## Debugging

Follow these steps to debug the WhatsApp Cloud API Webhook:

1. Install Cloudflare's CLI `(cloudflared)`:

    ```sh
    brew install cloudflared
    ```

2. Run an instance with a Cloudflare tunnel:

    ```sh
    cloudflared tunnel --url localhost:3000   
    ```

3. Send a message to the bot and wait for the webhook subscription.

### Credits

This package has been inspired by the [official WhatsApp Cloud API for Node.js](https://github.com/WhatsApp/WhatsApp-Nodejs-SDK). It includes several improvements and enhancements.

Made with ❤️ by [Refactoring, SRL](https://refactoring.do)
