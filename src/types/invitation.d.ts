
import { GuestBook } from "@/shared/types";

export type PersonPayloadId =
  | "groom"
  | "groomFather"
  | "groomMother"
  | "bride"
  | "brideFather"
  | "brideMother";

export type PersonPayloadType =
  | "신랑"
  | "신랑 아버지"
  | "신랑 어머니"
  | "신부"
  | "신부 아버지"
  | "신부 어머니";

export interface PersonPayload {
  id: PersonPayloadId;
  role: PersonPayloadType;
  name: string;
}

export interface PhonePayload extends PersonPayload {
  phone: string;
}

export interface AccountPayload extends PersonPayload {
  account: string;
}

export interface GuestBookBtn {
  label: string;
  onClick: () => void;
}

export type GuestBookView = Omit<GuestBook, "userId" | "password"> & {
  _id: string;
};
