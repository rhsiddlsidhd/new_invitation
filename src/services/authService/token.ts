"use server";
import { cookies } from "next/headers";

export async function getAuthToken() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) throw new Error("토큰이 존재하지 않습니다.");
  return token;
}

export async function deleteAuthToken() {
  const cookieStore = await cookies();
  cookieStore.delete("token");
}

export async function hasPasswordVerifiedAuthToken() {
  const cookieStore = await cookies();
  return cookieStore.has("password-verified");
}
