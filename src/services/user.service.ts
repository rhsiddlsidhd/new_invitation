import User, { BaseUser, UserDocument } from "@/models/user.model";
import { dbConnect } from "@/shared/utils/mongodb";
// 유저 생성
export const createUser = async (user: BaseUser): Promise<UserDocument> => {
  await dbConnect();
  const newUser = await new User(user).save();
  return newUser;
};

// 이메일 중복 확인
export const checkEmailDuplicate = async (email: string): Promise<boolean> => {
  await dbConnect();
  const exists = await User.exists({ email });
  return !!exists;
};
