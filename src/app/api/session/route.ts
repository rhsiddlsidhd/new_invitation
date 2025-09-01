import { decrypt, getSession } from "@/lib/session";
import { NextResponse } from "next/server";

export const GET = async () => {
  const token = await getSession();
  const payload = await decrypt(token);
  return NextResponse.json({ success: true, userId: payload.userId });
};
