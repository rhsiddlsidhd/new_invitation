import { ServerError } from "@/types/error";
import User, { BaseUser } from "@/models/user.model";

import { dbConnect } from "@/shared/utils/mongodb";
import bcrypt from "bcryptjs";

// 유저 조회 및 유저 정보 가져오기
// export const getUserById = async (
//   userId: string,
// ): Promise<{
//   email: string;
//   userId: string;
// }> => {
//   await dbConnect();

//   const user = await User.findOne({ userId, isDelete: false });

//   if (!user) throw new Error("사용자를 찾을 수 없습니다.");

//   return {
//     email: user.email,
//     userId: user.userId,
//   };
// };

//비밀번호 가져오기
export const getUserPasswordById = async (
  email: string,
): Promise<{ password: string }> => {
  await dbConnect();
  const user = await User.findOne({ email, isDelete: false });
  if (!user) throw new ServerError("사용자를 찾을 수 없습니다.", 401);
  return {
    password: user.password,
  };
};

// 비밀번호 비교

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

// 비밀번호 변경 함수
// export const changePassword = async (
//   email: string,
//   newPassword: string,
// ): Promise<boolean> => {
//   await dbConnect();

//   // 새 비밀번호 해싱
//   const hashedNewPassword = await bcrypt.hash(newPassword, 12);

//   // 비밀번호 업데이트
//   const userBeforeUpdate = await User.findOneAndUpdate(
//     { email, isDelete: false },
//     { password: hashedNewPassword },
//   );

//   return !!userBeforeUpdate;
// };

// 유저 계정 삭제
export const softDeleteUser = async (id: string): Promise<void> => {
  await dbConnect();

  const updatedUser = await User.findOneAndUpdate(
    { userId: id },
    { isDelete: true },
    { new: true },
  );

  if (!updatedUser) throw new Error("사용자를 찾을 수 없습니다.");
};

// 유저 중복 확인
export const isEmailExists = async (email: string): Promise<boolean> => {
  await dbConnect();

  return (await User.exists({ email })) != null;
};

// 유저 생성

// export const createUser = async (user: BaseUser): Promise<void> => {
//   await dbConnect();

//   // 새 사용자 생성
//   const newUser = new User(user);

//   await newUser.save();
// };

// export const getUserIdByEmail = async (
//   email: string,
// ): Promise<string | null> => {
//   await dbConnect();
//   const user = await User.findOne({ email, isDelete: false })
//     .select("userId")
//     .lean();
//   return user ? user.userId : null;
// };
