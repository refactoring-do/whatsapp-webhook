import { Logger, Webhook } from "../src";

const observer = (message: any) => {
  console.log(JSON.stringify(message));
};

const port = +(process.env["PORT"] as string) || 3000;
const verificationToken =
  (process.env["VERIFICATION_TOKEN"] as string) || "qwertyuiop1234567890";

(async () => {
  const webhook = new Webhook({
    endpoint: "/webhook",
    port,
    verificationToken,
    observer,
  });

  webhook.run().then(Logger.log).catch(Logger.error);
})();
