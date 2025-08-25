import { decrypt, getSession } from "@/lib/session";
import Invitation, { InvitationInput } from "@/models/invitationSchma";
import { dbConnect } from "@/utils/mongodb";

export const createInvitation = async ({ data }: { data: InvitationInput }) => {
  await dbConnect();
  const token = await getSession();
  const payload = await decrypt(token);
  const invitation = new Invitation({ ...data, userId: payload.userId });
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
  console.log("data", data);
  const res = await Invitation.findOneAndUpdate(
    { userId: id },
    { $set: data },
    { new: true },
  )
    .select(" -__v -_id -galleries._id")
    .lean();
  console.log("res", res);

  if (!res) throw new Error("Failed to update invitation");

  return res;
};
