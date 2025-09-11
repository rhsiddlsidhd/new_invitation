import User from "@/models/userSchema";
import { dbConnect } from "@/utils/mongodb";

import bcrypt from "bcryptjs";
// 유저 조회 및 유저 정보 가져오기
export const getUserById = async (
  userId: string,
): Promise<{
  email: string;
  userId: string;
}> => {
  await dbConnect();

  const user = await User.findOne({ userId, isDelete: false });

  if (!user) throw new Error("사용자를 찾을 수 없습니다.");

  return {
    email: user.email,
    userId: user.userId,
  };
};

//비밀번호 가져오기
export const getUserPasswordById = async (
  userId: string,
): Promise<{ password: string }> => {
  await dbConnect();
  const user = await User.findOne({ userId, isDelete: false });
  if (!user) throw new Error("사용자를 찾을 수 없습니다.");
  return {
    password: user.password,
  };
};

// 비밀번호 비교
export const comparePasswords = async (
  plainPassword: string,
  hashedPassword: string,
): Promise<boolean> => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

// 이메일 변경
export const updateUserEmail = async ({
  id,
  email,
}: {
  id: string;
  email: string;
}): Promise<{ email: string }> => {
  await dbConnect();

  const updatedUser = await User.findOneAndUpdate(
    { userId: id },
    { email },
    {
      new: true,
    },
  );

  if (!updatedUser) throw new Error("사용자를 찾을 수 없습니다.");

  return {
    email: updatedUser.email,
  };
};

// 비밀번호 변경 전용 함수
export const changePassword = async (
  id: string,
  newPassword: string,
): Promise<void> => {
  await dbConnect();

  // 새 비밀번호 해싱
  const hashedNewPassword = await bcrypt.hash(newPassword, 12);

  // 비밀번호 업데이트
  const updated = await User.findOneAndUpdate(
    { userId: id },
    { password: hashedNewPassword },
  );
  if (!updated) throw new Error("사용자를 찾을 수 없습니다.");
};

export const softDeleteUser = async (id: string): Promise<void> => {
  await dbConnect();

  const updatedUser = await User.findOneAndUpdate(
    { userId: id },
    { isDelete: true },
    { new: true },
  );

  if (!updatedUser) throw new Error("사용자를 찾을 수 없습니다.");
};
