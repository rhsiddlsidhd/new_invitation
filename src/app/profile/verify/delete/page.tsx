import { hasPasswordVerifiedAuthToken } from "@/services/auth/token";
import { redirect } from "next/navigation";

const page = async () => {
  const isPasswordVerified = await hasPasswordVerifiedAuthToken();

  if (!isPasswordVerified) {
    redirect("/verify?next=/profile/delete");
  }
};
export default page;
