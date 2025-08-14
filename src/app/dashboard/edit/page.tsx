import InvitationInfoForm from "@/components/organisms/InvitationInfoForm";
import { decrypt, getSession } from "@/lib/session";
import { redirect } from "next/navigation";

const page = async () => {
  try {
    const token = await getSession();
    await decrypt(token);
    return <InvitationInfoForm readOnly={false} />;
  } catch {
    redirect("/");
  }
};

export default page;
