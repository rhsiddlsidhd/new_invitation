'use server';
import { deleteAuthToken } from '@/domains/auth';
import { handleActionError } from '@/shared/utils/error';
import { success } from '@/shared/utils/response';

export const signOut = async () => {
  try {
    await deleteAuthToken();
    return success(null);
  } catch (e) {
    return handleActionError(e);
  }
};
