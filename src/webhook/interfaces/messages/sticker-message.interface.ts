import { MediaMessage } from "./base.interface";

export interface StickerMessage extends MediaMessage {
  animated: boolean;
}
