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

export interface UserData {
  userId: string;
  email: string;
  newAccessToken?: string;
}

export interface UserId {
  userId: string;
}

export type Post = {
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
  urls: string[] | null[];
}
