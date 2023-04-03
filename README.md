# WhatsApp Cloud API Webhook

## Getting started

1. Install dependecy

```sh
npm install @refactoring-do/whatsapp-webhook
```

2. Create a TypeScript file

```sh
  touch myWebhook.ts
```

3. Write the following code:

```ts
import { Logger, Webhook } from "@refactoring-do/whatsapp-webhook";

const observer = (message: any) => {
  console.log(JSON.stringify(message));
};

const port = +(process.env["PORT"] as string);
const verificationToken = process.env["VERIFICATION_TOKEN"] as string;

(async () => {
  const webhook = new Webhook({
    endpoint: "/webhook",
    port,
    verificationToken,
    observer,
  });

  webhook.run().then(Logger.log).catch(Logger.error);
})();
```

4. Run the code

```sh
  ts-node myWebhook.ts
```

5. Output

The server is listening on the provided port and ready to verify the WhatsApp Cloud API token.

## Debuggin

1. Install cloudflared CLI:

```sh
brew install cloudflared
```

2. Run instance with a Cloudflare tunnel:

```sh
cloudflared tunnel --url localhost:9000   
```
