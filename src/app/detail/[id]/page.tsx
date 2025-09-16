import Spinner from "@/components/atoms/Spinner";
import InvitationContainer from "@/components/template/invitation/InvitationContainer";
import { getUserGuestBook } from "@/services/guestBook";
import { getUserInvitationInfo } from "@/services/invitation";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export const generateStaticParams = () => {
  return [{ id: "rhsiddlsidhd1" }];
};

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  try {
    const { id } = await params;

    const [userInfo, guestBook] = await Promise.all([
      getUserInvitationInfo({ userId: id }),
      getUserGuestBook({ userId: id }),
    ]);

    const guestBookForClient = guestBook.map((item) => ({
      ...item,
      _id: item._id.toString(),
    }));

    if (!userInfo) {
      throw new Error("유저를 찾을 수 없습니다.");
    }

    return (
      <section className="w-full bg-[#f0f0f0]">
        <Suspense
          fallback={
            <div className="flex h-screen w-full items-center justify-center">
              <Spinner />
            </div>
          }
        >
          <InvitationContainer
            userInfo={userInfo}
            guestBook={guestBookForClient ?? []}
          />
        </Suspense>
      </section>
    );
  } catch (e) {
    const message = e instanceof Error ? e.message : e;
    console.log("message", message);
    if (message === "유저를 찾을 수 없습니다.") {
      redirect("/dashboard");
    }
    console.error("Detail Page Server Error", message);
  }
};

export default Page;
