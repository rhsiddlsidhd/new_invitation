import InvitationInfoForm from "@/components/organisms/forms/InvitationInfoForm";
import { decrypt } from "@/shared/lib/jose";
import { getAuthToken } from "@/domains/auth";
import { isUserInvitationInfo } from "@/domains/invitation";
import { getUserIdByEmail } from "@/domains/user/services";

import { redirect } from "next/navigation";

const page = async () => {
  const token = await getAuthToken();
  const payload = await decrypt(token);
  if (!payload) {
    redirect("/");
  }

  const userId = await getUserIdByEmail(payload.email);
  if (!userId) {
    redirect("/");
  }

  const useHasInvitation = await isUserInvitationInfo(userId);

  if (useHasInvitation) {
    redirect("/dashboard");
  }

  return <InvitationInfoForm readOnly={false} />;
};

export default page;
