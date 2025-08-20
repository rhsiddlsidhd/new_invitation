import Invitation from "@/models/invitationSchma";
import { dbConnect } from "@/utils/mongodb";

export const isUserInvitationInfo = async (userId: string) => {
  try {
    console.log("1");
    await dbConnect();
    console.log("2");
    const res = await Invitation.exists({ userId });
    console.log("3");
    return !!res;
  } catch (e) {
    console.error("GetUserInvitationInfo Error:", e);
    return false;
  }
};

export const getUserInvitationInfo = async ({ userId }: { userId: string }) => {
  await dbConnect();
  const res = await Invitation.findOne({ userId })
    .select("-_id -__v -galleries._id")
    .lean();
  return res;
};
