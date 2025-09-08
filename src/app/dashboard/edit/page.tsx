import InvitationInfoForm from "@/components/organisms/forms/InvitationInfoForm";
import { decrypt, getSession } from "@/lib/session";
import { isUserInvitationInfo } from "@/services/invitationServices";
import { redirect } from "next/navigation";

const page = async () => {
  try {
    const token = await getSession();
    const payload = await decrypt(token);
    const useHasInvitation = await isUserInvitationInfo(payload.userId);

    if (useHasInvitation) {
      throw new Error("ALLREADY_HAS_INVITATION");
    }

    return <InvitationInfoForm readOnly={false} />;
  } catch (e) {
    if (e instanceof Error) {
      return e.message === "ALLREADY_HAS_INVITATION" && redirect("/dashboard");
    }
    console.error("에러", e);
    redirect("/");
  }
};

export default page;
