import { InvitationInput } from "@/models/invitationSchema";
import { getInvitation } from "@/services/invitation";

import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ userId: string }> },
) => {
  const { userId } = await params;

  const user: InvitationInput | null = await getInvitation(userId);

  return NextResponse.json({ success: true, data: user && user });
};
