import { decrypt, getSession } from "@/lib/session";
import Link from "next/link";
import InvitationInfoForm from "@/components/organisms/InvitationInfoForm";
import Btn from "@/components/atoms/Btn";
import { signOut } from "@/actions/auth";
import { redirect } from "next/navigation";
import { InvitationInput } from "@/models/invitationSchma";
import Box from "@/components/atoms/Box";

type InvitationApiResponse = {
  success: boolean;
  data: InvitationInput;
};

export default async function page() {
  try {
    const token = await getSession();
    const payload = await decrypt(token);
    const res = await fetch(
      `http://localhost:3000/api/invitation/${payload.userId}`,
    );
    const { data }: InvitationApiResponse = await res.json();

    return (
      <div className="m-auto w-full max-w-[1028px] p-2 sm:mb-24 sm:p-6">
        <header className="mb-7 flex justify-between rounded-xl bg-[#f5f5f5] p-5">
          <div>
            <h1>대시보드</h1>
            <p>{payload.userId}님 환영합니다.</p>
          </div>
          <Btn bgColor="bg-[#dc3545]" onClick={signOut}>
            로그아웃
          </Btn>
        </header>

        <div className="w-full gap-5 space-y-5">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-5">
            <Box>
              <h3>내 정보</h3>

              <Link
                className="mt-4 inline-block rounded-sm bg-[#007cba] px-4 py-2 text-white"
                href={`/profile`}
              >
                프로필 수정
              </Link>
            </Box>

            {!data && (
              <Box>
                <h3>초대장 관리</h3>
                <p>초대장을 생성하고 관리하세요.</p>
                <Link
                  href="/dashboard/edit"
                  style={{
                    display: "inline-block",
                    marginTop: "10px",
                    padding: "8px 16px",
                    backgroundColor: "#28a745",
                    color: "white",
                    textDecoration: "none",
                    borderRadius: "4px",
                  }}
                >
                  등록하기
                </Link>
              </Box>
            )}
          </div>
          {data && <InvitationInfoForm readOnly={true} data={data} />}
        </div>
      </div>
    );
  } catch {
    redirect("/");
  }
}
