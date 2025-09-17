import Spinner from "@/components/atoms/Spinner";
import InvitationContainer from "@/components/template/invitation/InvitationContainer";
import { getUserGuestBook } from "@/services/guestBook";
import { getUserInvitationInfo } from "@/services/invitation";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export const generateStaticParams = () => {
  return [{ id: process.env.SAMPLE_USERID }];
};

const Page = async ({
  params,
  searchParams,
}: {
  params: Promise<{ productId: string }>;
  searchParams: Promise<{ u: string | null }>;
}) => {
  const { productId } = await params;
  const { u } = await searchParams;
  console.log("p", productId);
  console.log("u", u);
  if (!u) {
    // 리다이렉를 notfound로 바꾸기
    redirect("/");
  }
  const [userInfo, guestBook] = await Promise.all([
    getUserInvitationInfo({ userId: u }),
    getUserGuestBook({ userId: u }),
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
      <InvitationContainer
        productId={productId}
        userInfo={userInfo}
        guestBook={guestBookForClient}
      />
    </Suspense>
  );
};

export default Page;
