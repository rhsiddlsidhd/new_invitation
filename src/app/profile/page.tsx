import React from "react";
import Btn from "@/components/atoms/Btn";
import Link from "next/link";
import ProfileBox from "@/components/molecules/boxs/ProfileBox";
import { getUserById } from "@/services/user";
import { decrypt } from "@/lib/jose";
import { deleteAuthToken, getAuthToken } from "@/services/auth/token";
import { redirect } from "next/navigation";

const page = async () => {
  const token = await getAuthToken();
  const payload = await decrypt(token);
  if (!payload) {
    // 기존에 있던 토큰은 제거하고 재 로그인;
    await deleteAuthToken();
    redirect("/");
  }
  const user = await getUserById(payload.userId);
  const { email, userId } = user;

  return (
    <div className="h-screen bg-[#f5f5f5] p-5">
      <div className="m-auto w-full max-w-[800px]">
        <div className="flex items-center justify-between p-5">
          <h1 className="text-3xl font-bold">내 프로필</h1>
          <Link href="/dashboard">
            <Btn bgColor="bg-[#007cba]" className="py-3">
              대시보드
            </Btn>
          </Link>
        </div>
      </div>

      <div className="m-auto w-full max-w-[800px]">
        <ProfileBox userId={userId} email={email} />

        <div className="my-4 rounded-2xl bg-white p-5 shadow-2xl">
          <h3 className="mb-4 text-xl font-bold text-[#333]">계정 관리</h3>

          <div className="grid grid-cols-3 gap-4 max-sm:grid-cols-1">
            <Link href="/verify?next=/profile/edit">
              <Btn bgColor="bg-[#28a745]" className="w-full">
                프로필 수정
              </Btn>
            </Link>

            <Link href="/verify?next=/profile/password">
              <Btn bgColor="bg-[#6c757d]" className="w-full">
                비밀번호 변경
              </Btn>
            </Link>
            <Link href="/verify?next=/profile/delete">
              <Btn bgColor="bg-[#b81f1f]" className="w-full">
                계정 삭제
              </Btn>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
