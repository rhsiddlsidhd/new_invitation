import { redirect } from "next/navigation";
import VerifyForm from "../../components/organisms/forms/VerifyForm";
import { getSession } from "@/lib/session";

const Page = async ({
  searchParams,
}: {
  searchParams?: Promise<{ next?: string }>;
}) => {
  try {
    await getSession();
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
