import { redirect } from "next/navigation";
import VerifyForm from "../../../components/organisms/forms/VerifyForm";
import { decrypt } from "@/lib/jose";
import { getAuthToken } from "@/services/auth/token";

const Page = async ({
  searchParams,
}: {
  searchParams?: Promise<{ next: string }>;
}) => {
  const token = await getAuthToken();
  const payload = await decrypt(token);
  if (!payload) {
    redirect("/");
  }
  const query = await searchParams;

  if (!query) {
    redirect("/");
  }

  return <VerifyForm path={query.next} />;
};

export default Page;
