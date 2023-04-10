import { MediaMessage } from "./base.interface";

export interface DocumentMessage extends MediaMessage {
  filename: string;
}
