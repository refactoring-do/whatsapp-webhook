import { Webhook } from '../src';

describe('WhatsApp Cloud API webhook suite', () => {
  let webhook: Webhook;

  beforeEach(() => {
    webhook = new Webhook({
      endpoint: '/webhook',
      port: 3000,
      verificationToken: '123abc',
      observer: () => {},
    });
  });

  it('Should defined a webhook instance', () => {
    const sut = webhook;
    expect(sut).toBeDefined();
  });
});
