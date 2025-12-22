import User, { UserRole } from "@/models/user.model";
import { dbConnect } from "@/shared/utils/mongodb";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

export type LeanUser = {
  email: string;
  name: string;
  phone: string;
  password: string;
  role: UserRole;
  isDelete: boolean;
  _id: string; // MongoDB id
};

type UserQuery = { email?: string; id?: string };

type UserFilter = {
  isDelete: boolean;
  email?: string;
  _id?: mongoose.Types.ObjectId;
};

export const getUser = async (query: UserQuery): Promise<LeanUser | null> => {
  await dbConnect();

  const filter: UserFilter = { isDelete: false };

  if (query.email) filter.email = query.email;
  if (query.id) {
    if (!mongoose.Types.ObjectId.isValid(query.id)) return null;
    filter._id = new mongoose.Types.ObjectId(query.id);
  }

  const user = await User.findOne(filter)
    .select("_id email name phone password role isDelete")
    .lean<LeanUser>();

  return user;
};

// hash 비밀번호 비교
export const comparePasswords = async (
  plainPassword: string,
  hashedPassword: string,
): Promise<boolean> => {
  const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
  return isMatch;
};
