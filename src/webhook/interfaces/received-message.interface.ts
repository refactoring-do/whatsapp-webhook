import { MessageType } from '../enums';

interface Metadata {
  display_phone_number: string;
  phone_number_id: string;
}

interface Value {
  messaging_product: string;
  metadata: Metadata;
  contacts: Contact[];
  messages: Message[];
}

interface Profile {
  name: string;
}

interface Contact {
  profile: Profile;
  wa_id: string;
}

interface Message {
  from: string;
  id: string;
  timestamp: string;
  type: MessageType;
  [key: string]: any;
}

interface Changes {
  value: Value;
  field: string;
}

interface Entry {
  id: string;
  changes: Changes[];
}

export interface ReceivedMessage {
  object: string;
  entry: Entry[];
}
