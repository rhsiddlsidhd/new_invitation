import { decrypt, encrypt } from '@/shared/lib/token';
import { getAuthToken } from '@/domains/auth';
import { ClientError } from '@/shared/types/error';
import { handleMethodError } from '@/shared/utils/error';

import { NextResponse } from 'next/server';

export const GET = async () => {
  // 리프레쉬 토큰 유효성 검사 이후 Access token 발행
  try {
    const token = await getAuthToken();
    const result = await decrypt({ token, type: 'REFRESH' });
    if (!result.payload) throw new ClientError('유효하지 않은 토큰입니다.', 401);
    const accessToken = await encrypt({ email: result.payload.email, type: 'ACCESS' });

    return NextResponse.json(
      {
        success: true,
        data: { accessToken },
      },
      { status: 200 },
    );
  } catch (e) {
    return handleMethodError(e);
  }
};
