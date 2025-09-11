import mongoose from "mongoose";

declare global {
  var mongooseCache: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

// API 응답 타입 정의

interface ApiResponseSuccess<T = unknown> {
  success: true;
  data: T;
}

interface ApiResponseFail {
  success: false;
  message: string;
}

export type ApiResponse<T = unknown> = ApiResponseSuccess<T> | ApiResponseFail;

interface ActionSuccessState<T = unknown> {
  success: true;
  message: string;
  data?: T;
}

interface ActionFailState {
  success: false;
  error: Record<string, string[] | undefined>;
}

// export type ActionState = {
//   success: boolean;
//   message?: string;
// } | null;

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

// export interface ViewGalleryData extends GalleryData {
//   mode: "get" | "edit";
// }

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
