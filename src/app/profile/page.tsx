import React from "react";
import { decrypt, getSession } from "@/lib/session";
import { getUserById } from "@/services/userServices";
import Btn from "@/components/atoms/Btn";
import Label from "@/components/atoms/Label";
import Input from "@/components/atoms/Input";
import Link from "next/link";
import { redirect } from "next/navigation";

const page = async () => {
  try {
    const token = await getSession();
    const payload = await decrypt(token);
    const user = await getUserById(payload.userId);

    return (
      <div className="h-screen bg-[#f5f5f5] p-5">
        {/* 헤더 */}

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

        {/* 메인 콘텐츠 */}
        <div className="m-auto w-full max-w-[800px]">
          {/* 프로필 카드 */}
          <div className="my-4 rounded-2xl bg-white p-5 shadow-2xl">
            {/* 프로필 아바타 영역 */}
            <div className="flex items-center gap-4 border-b-1 border-[#e9ecef] pb-8">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#007cba]">
                <span className="text-3xl font-bold text-white">
                  {user.data.userId.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#333]">
                  {user.data.userId}
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
              <div className="my-2">
                <Label className="font-bold text-[#555]">사용자 ID</Label>
                <Input
                  readOnly
                  value={user.data.userId}
                  className="bg-[#f8f9fa] py-4"
                />
              </div>

              <div className="my-2">
                <Label className="font-bold text-[#555]">이메일 주소</Label>
                <Input
                  readOnly
                  value={user.data.email}
                  className="bg-[#f8f9fa] py-4"
                />
              </div>
            </div>
          </div>

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
  } catch {
    // console.log("e", e);
    redirect("/");
  }
};

export default page;
