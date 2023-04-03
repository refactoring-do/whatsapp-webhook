type MessageObserver = (message: any) => void;

export interface WebhookOptions {
  endpoint: string;
  port: number;
  verificationToken: string;
  observer: MessageObserver;
}
