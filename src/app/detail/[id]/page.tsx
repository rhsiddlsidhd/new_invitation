import InvitationContainer from "@/components/template/invitation/InvitationContainer";
import { getUserGuestBook } from "@/services/guestBookServices";
import { getUserInvitationInfo } from "@/services/invitationServices";

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
        <InvitationContainer
          userInfo={userInfo}
          guestBook={guestBookForClient ?? []}
        />
      </section>
    );
  } catch (e) {
    const message = e instanceof Error ? e.message : e;
    console.error("Detail Page Server Error", message);
  }
};

export default Page;
