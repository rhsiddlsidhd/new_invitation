import InvitationContainer from "@/components/template/invitation/InvitationContainer";
import { getUserInvitationInfo } from "@/lib/invitation";
import { InvitationInput } from "@/models/invitationSchma";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  try {
    const { id } = await params;
    // console.log(id);
    const res = await getUserInvitationInfo({ userId: "rhsiddlsidhd1" });

    if (!res) {
      throw new Error("유저를 찾을 수 없습니다.");
    }

    const data: InvitationInput = res;

    return (
      <section className="w-full bg-[#f0f0f0]">
        <InvitationContainer data={data} />
      </section>
    );
  } catch (e) {
    const message = e instanceof Error ? e.message : e;
    console.error("Detail Page Server Error", message);
  }
};

export default Page;
