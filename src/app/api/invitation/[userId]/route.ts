import { InvitationInput, getInvitation } from '@/domains/invitation';
import { handleMethodError } from '@/shared/utils/error';

import { NextRequest, NextResponse } from 'next/server';

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ userId: string }> },
) => {
  try {
    const { userId } = await params;

    const user: InvitationInput | null = await getInvitation(userId);

    return NextResponse.json({ success: true, data: user });
  } catch (e) {
    return handleMethodError(e);
  }
};
