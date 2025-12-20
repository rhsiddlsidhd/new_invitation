import { decrypt } from '@/shared/lib/jose';
import { getAuthToken } from '@/domains/auth';
import { NextResponse } from 'next/server';
import { handleMethodError } from '@/shared/utils/error';
import { ClientError } from '@/shared/types/error';

export const GET = async () => {
  try {
    const token = await getAuthToken();
    const payload = await decrypt(token);

    if (!payload) {
      throw new ClientError('Invalid token', 401);
    }

    return NextResponse.json({
      success: true,
      data: { userId: payload.userId },
    });
  } catch (e) {
    return handleMethodError(e);
  }
};
