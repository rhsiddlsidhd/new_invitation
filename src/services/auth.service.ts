import { User } from "@/domains/user";
import { dbConnect } from "@/shared/utils/mongodb";


// 유저 비밀번호 조회
export const getUserPasswordById = async (
  userId: string,
): Promise<{ password: string }> => {
  await dbConnect();

  const user = await User.findOne({ userId, isDelete: false });

  if (!user) throw new Error("사용자를 찾을 수 없습니다.");

  return { password: user.password };
};


