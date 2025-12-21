import { decrypt } from "@/shared/lib/token";
import { NextResponse } from "next/server";
import { handleMethodError } from "@/shared/utils/error";
import { ClientError, ServerError } from "@/shared/types/error";
import { getCookie } from "@/shared/lib/cookies";

export const GET = async () => {
  try {
    const cookie = await getCookie("token");
    if (!cookie) throw new ServerError("Authentication token is missing.", 401);

    const refreshPayload = await decrypt({
      token: cookie.value,
      type: "REFRESH",
    });

    if (!refreshPayload) {
      throw new ClientError("Invalid token", 401);
    }
    const { payload } = refreshPayload;
    return NextResponse.json({
      success: true,
      data: { userId: payload.userId },
    });
  } catch (e) {
    return handleMethodError(e);
  }
};
