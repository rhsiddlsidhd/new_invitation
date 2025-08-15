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
