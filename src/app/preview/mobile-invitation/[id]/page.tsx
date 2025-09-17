import Spinner from "@/components/atoms/Spinner";
import InvitationContainer from "@/components/template/invitation/InvitationContainer";
import { getUserGuestBook } from "@/services/guestBook";
import { getUserInvitationInfo } from "@/services/invitation";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export const generateStaticParams = () => {
  return [{ id: process.env.SAMPLE_USERID }];
};

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const [userInfo, guestBook] = await Promise.all([
    getUserInvitationInfo({ userId: id }),
    getUserGuestBook({ userId: id }),
  ]);

  if (!userInfo) {
    redirect("/dashboard");
  }

  const guestBookForClient = (guestBook ?? []).map((item) => ({
    ...item,
    _id: item._id.toString(),
  }));

  return (
    <Suspense
      fallback={
        <div className="flex h-screen w-full items-center justify-center">
          <Spinner />
        </div>
      }
    >
      <InvitationContainer userInfo={userInfo} guestBook={guestBookForClient} />
    </Suspense>
  );
};

export default Page;
