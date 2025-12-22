import { decrypt, generateAccessEncrypt } from '@/shared/lib/jose';
import { getAuthToken } from '@/domains/auth';
import { ClientError } from '@/shared/types/error';
import { handleMethodError } from '@/shared/utils/error';

import { NextResponse } from 'next/server';

export const GET = async () => {
  // 리프레쉬 토큰 유효성 검사 이후 Access token 발행
  try {
    const token = await getAuthToken();
    const payload = await decrypt(token);
    if (!payload) throw new ClientError('유효하지 않은 토큰입니다.', 401);
    const accessToken = await generateAccessEncrypt({ email: payload.email });

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
