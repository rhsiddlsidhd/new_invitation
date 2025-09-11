import { redirect } from "next/navigation";
import VerifyForm from "../../components/organisms/forms/VerifyForm";
import { decrypt } from "@/lib/jose";
import { getAuthToken } from "@/services/authService/token";

const Page = async ({
  searchParams,
}: {
  searchParams?: Promise<{ next?: string }>;
}) => {
  try {
    const token = await getAuthToken();
    await decrypt(token);
    const resolvedParams = await searchParams;

    if (!resolvedParams?.next) {
      redirect("/");
    }

    return <VerifyForm path={resolvedParams.next} />;
  } catch {
    redirect("/");
  }
};

export default Page;
