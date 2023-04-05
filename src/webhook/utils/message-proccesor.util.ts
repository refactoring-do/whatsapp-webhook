import { ReceivedMessage, ProcessedMessage } from '../interfaces';
import { MessageType } from '../enums';

export class MessageProccesor {
  static process(message: ReceivedMessage): ProcessedMessage {
    const currentMessage = message.entry[0].changes[0].value.messages[0];
    const messageAuthor = message.entry[0].changes[0].value.contacts[0].profile.name;

    let proccessedMessage: ProcessedMessage;

    switch (currentMessage.type) {
      case MessageType.text:
        proccessedMessage = {
          id: currentMessage.id,
          from: currentMessage.from,
          name: messageAuthor,
          timestamp: currentMessage.timestamp,
          data: currentMessage[currentMessage.type],
          type: MessageType.text,
        };

        break;

      case MessageType.image:
      case MessageType.document:
      case MessageType.audio:
      case MessageType.video:
      case MessageType.sticker:
      case MessageType.location:
      case MessageType.contacts:
        proccessedMessage = {
          id: currentMessage.id,
          from: currentMessage.from,
          name: messageAuthor,
          timestamp: currentMessage.timestamp,
          data: currentMessage[currentMessage.type],
          type: MessageType[currentMessage.type as MessageType],
        };

        break;

      case MessageType.interactive:
        proccessedMessage = {
          id: currentMessage.id,
          from: currentMessage.from,
          name: messageAuthor,
          timestamp: currentMessage.timestamp,
          data: {
            ...(currentMessage[currentMessage.type].list_reply || currentMessage[currentMessage.type].button_reply),
          },
          type: MessageType[currentMessage.type as MessageType],
        };

        break;

      case MessageType.order:
        proccessedMessage = {
          id: currentMessage.id,
          from: currentMessage.from,
          name: messageAuthor,
          timestamp: currentMessage.timestamp,
          data: {
            product_items: currentMessage[currentMessage.type].product_items,
            catalog_id: currentMessage[currentMessage.type].catalog_id,
          },
          type: MessageType[currentMessage.type as MessageType],
        };

        break;

      default:
        throw new Error(`Invalid message type: ${currentMessage.type}`);
    }

    if (currentMessage.context) {
      proccessedMessage.context = currentMessage.context;
    }

    return proccessedMessage;
  }
}
