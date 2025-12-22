import User from "@/models/user.model";
import { dbConnect } from "@/shared/utils/mongodb";
import bcrypt from "bcryptjs";

// 유저 비밀번호 조회
export const getUserPasswordById = async (
  email: string,
): Promise<{ password: string }> => {
  await dbConnect();

  const user = await User.findOne({ email, isDelete: false });
  console.log("user", user);

  if (!user) throw new Error("사용자를 찾을 수 없습니다.");

  return { password: user.password };
};

// hash 비밀번호 비교
export const comparePasswords = async (
  plainPassword: string,
  hashedPassword: string,
): Promise<boolean> => {
  const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
  return isMatch;
};
