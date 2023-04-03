# WhatsApp Cloud API Webhook

## Getting started

```typescript
import { Logger, Webhook } from "../src";

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

## Debuggin

1. Install cloudflared CLI:

```sh
    brew install cloudflared
```

2. Run instance with a Cloudflare tunnel:

```sh
cloudflared tunnel --url localhost:9000   
```
