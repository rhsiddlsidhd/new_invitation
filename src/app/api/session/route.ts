import { decrypt } from "@/lib/jose";
import { getAuthToken } from "@/services/auth/token";
import { NextResponse } from "next/server";

export const GET = async () => {
  const token = await getAuthToken();
  const payload = await decrypt(token);
  return NextResponse.json({ success: true, userId: payload.userId });
};
