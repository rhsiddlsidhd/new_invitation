import { InvitationInput } from "@/models/invitationSchma";
import { getInvitation } from "@/services/invitationServices";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { userId: string } },
) => {
  const { userId } = await params;

  const user: InvitationInput | null = await getInvitation(userId);

  return NextResponse.json({ success: true, data: user && user });
};
