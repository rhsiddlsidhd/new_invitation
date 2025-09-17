import mongoose from "mongoose";

declare global {
  var mongooseCache: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

export interface UserData {
  userId: string;
  email: string;
  newAccessToken?: string;
}

export interface UserId {
  userId: string;
}

export type Particle = {
  size: number;
  x: number;
  y: number;
  z: number;
  moveX: number;
  moveY: number;
};

export interface GalleryData {
  id: string;
  type: "A" | "B" | "C" | "D" | "E";
  images: string[] | null[];
}

type GalleryType = "A" | "B" | "C" | "D" | "E";

export interface CloudinaryUploadResponse {
  asset_id: string;
  public_id: string;
  version: number;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  bytes: number;
  type: string;
  url: string;
  secure_url: string;
  folder?: string;
  original_filename: string;
}

interface GalleryMapClientItem {
  type: GalleryType;
  images: (File | CloudinaryUploadResPonse)[];
}

export type GalleryMapClient = Map<string, GalleryMapClientItem>;

type GalleryMapServerItem = {
  type: GalleryType;
  images: CloudinaryUploadResPonse[];
};

export type GalleryMapServer = Map<string, GalleryMapServerItem>;

export type GalleryPayload = {
  id: string;
  type: GalleryType;
  images: CloudinaryUploadResponse[];
};

export type GalleryEntry = {
  id: string;
  type: GalleryType;
  images: string[];
};

export type Thumbnail = CloudinaryUploadResPonse;

export interface GuestBook {
  userId: string;
  name: string;
  password: string;
  message: string;
}

export interface PanelField {
  label: string;
  name: string;
  type: string;
  required: boolean;
  placeholder?: string;
  onChange?: () => void;
  onClick?: () => void;
  value?: string;
}

export interface APISUCCESSRESPONSE<T = void> {
  success: true;
  data: {
    code: number;
    message: string;
    payload: T;
  };
}

export interface APIFAILRESPONSE extends APIRESPONSE {
  success: false;
  error: {
    code: number;
    message: string;
  };
}

export type APIRESPONSE<T = void> = APISUCCESSRESPONSE<T> | APIFAILRESPONSE;
