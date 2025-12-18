import { Invitation, InvitationInput } from "@/domains/invitation";
import { dbConnect } from "@/shared/utils/mongodb";

export const createInvitation = async ({
  id,
  data,
}: {
  id: string;
  data: InvitationInput;
}) => {
  await dbConnect();

  const invitation = new Invitation({ ...data, userId: id });
  const savedInvitation = await invitation.save();
  return {
    success: true,
    data: savedInvitation,
  };
};

export const getInvitation = async (
  userId: string,
): Promise<InvitationInput | null> => {
  await dbConnect();

  const res = await Invitation.findOne({ userId })
    .select("-_id -createdAt -updatedAt -__v -galleries._id")
    .lean();

  return res;
};

export const patchInvitation = async ({
  data,
  id,
}: {
  data: Partial<InvitationInput>;
  id: string;
}) => {
  await dbConnect();

  const res = await Invitation.findOneAndUpdate(
    { userId: id },
    { $set: data },
    { new: true },
  )
    .select(" -__v -_id -galleries._id")
    .lean();

  if (!res) throw new Error("Failed to update invitation");

  return res;
};

export const getUserInvitationInfo = async ({ userId }: { userId: string }) => {
  await dbConnect();

  const res = await Invitation.findOne({ userId })
    .select("-_id -__v -galleries._id")
    .lean();
  return res;
};

export const isUserInvitationInfo = async (userId: string) => {
  try {
    await dbConnect();

    const res = await Invitation.exists({ userId });

    return !!res;
  } catch (e) {
    console.error("GetUserInvitationInfo Error:", e);
    return false;
  }
};
