import { handleMethodError } from '@/shared/utils/error';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const DELETE = async (): Promise<NextResponse> => {
  try {
    const cookieStore = cookies();
    cookieStore.delete('userEmail');
    return NextResponse.json({
      success: true,
      data: { message: '쿠키를 성공적으로 삭제하였습니다.' },
    });
  } catch (e) {
    return handleMethodError(e);
  }
};
