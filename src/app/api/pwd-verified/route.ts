import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function DELETE() {
  const cookieStore = await cookies();

  if (cookieStore.has("password-verified")) {
    cookieStore.delete("password-verified");
  }

  return new NextResponse(null, { status: 204 });
}
