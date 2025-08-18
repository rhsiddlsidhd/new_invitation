import { getInvitation } from "@/services/invitationServices";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { userId: string } },
) => {
  const { userId } = await params;

  const user = await getInvitation(userId);
  console.log("너어딧냔", user);
  return NextResponse.json({ success: true, data: user });
};
