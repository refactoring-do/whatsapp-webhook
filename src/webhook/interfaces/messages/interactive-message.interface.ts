import { Reply } from "./base.interface";

export interface ListReply extends Reply {
  description: string;
}

export interface ButtonReply extends Reply {}

export interface InteractiveMessage {
  type: string;
  list_reply?: ListReply;
  button_reply?: ButtonReply;
}
