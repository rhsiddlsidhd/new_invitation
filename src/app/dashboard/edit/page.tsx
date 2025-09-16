import InvitationInfoForm from "@/components/organisms/forms/InvitationInfoForm";
import { decrypt } from "@/lib/jose";
import { getAuthToken } from "@/services/auth/token";
import { isUserInvitationInfo } from "@/services/invitation";

import { redirect } from "next/navigation";

const page = async () => {
  const token = await getAuthToken();
  const payload = await decrypt(token);
  if (!payload) {
    redirect("/");
  }
  const useHasInvitation = await isUserInvitationInfo(payload.userId);

  if (useHasInvitation) {
    redirect("/dashboard");
  }

  return <InvitationInfoForm readOnly={false} />;
};

export default page;
