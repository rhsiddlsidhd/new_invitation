import User, { UserRole } from "@/models/user.model";
import { dbConnect } from "@/utils/mongodb";
import { getCookie } from "@/lib/cookies/get";
import { decrypt, encrypt } from "@/lib/token";
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

export type AuthData = {
  accessToken: string;
  role: UserRole;
  userId: string;
} | null;

export async function getAuth(): Promise<AuthData> {
  try {
    const cookie = await getCookie("token");
    const refreshToken = cookie?.value;

    if (!refreshToken) {
      return null;
    }

    const { payload } = await decrypt({ token: refreshToken, type: "REFRESH" });

    if (!payload.id) {
      return null;
    }

    const user = await getUser({ id: payload.id });

    if (!user) {
      return null;
    }

    const accessToken = await encrypt({
      id: user._id.toString(),
      type: "ACCESS",
    });

    return {
      accessToken,
      role: user.role,
      userId: user._id.toString(),
    };
  } catch {
    return null;
  }
}
