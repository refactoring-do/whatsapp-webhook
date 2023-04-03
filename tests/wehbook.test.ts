import { Webhook } from '../src';

test('Testing webhook', () => {
  const webhook = new Webhook({
    endpoint: '/webhook',
    port: 3000,
    verificationToken: '123abc',
    observer: () => {},
  });

  webhook.run().then((message) => {
    expect(message).toBe('Webhook is running on port 3000');
  });
});
