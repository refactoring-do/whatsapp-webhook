import { MediaMessage } from "./base.interface";

export interface AudioMessage extends MediaMessage {
  voice: boolean;
}
