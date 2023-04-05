import { MessageType } from '../enums';

export interface ProcessedMessage {
  id: string;
  from: string;
  name: string;
  type: MessageType;
  data: any;
  timestamp: string;
  context?: any;
}
