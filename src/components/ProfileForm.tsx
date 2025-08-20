"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

import Label from "./atoms/Label";
import Input from "./atoms/Input";
import Btn from "./atoms/Btn";

const ProfileForm = ({ user }: { user: { userId: string; email: string } }) => {
  const router = useRouter();

  useEffect(() => {
    const deleteCookie = async () => {
      await fetch("/api/pwd-verified", {
        method: "DELETE",
      });
    };
    deleteCookie();
  }, []);

  return (
    <div className="h-screen bg-[#f5f5f5] p-5">
      {/* 헤더 */}
      <div className="m-auto w-full max-w-[800px]">
        <div className="flex items-center justify-between p-5">
          <h1 className="text-3xl font-bold">내 프로필</h1>
          <Btn
            bgColor="bg-[#007cba]"
            onClick={() => router.push("/dashboard")}
            className="py-3"
          >
            대시보드
          </Btn>
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
                {user.userId.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#333]">{user.userId}</h2>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
            <div className="my-2">
              <Label className="font-bold text-[#555]">사용자 ID</Label>
              <Input
                readOnly
                value={user.userId}
                className="bg-[#f8f9fa] py-4"
              />
            </div>

            <div className="my-2">
              <Label className="font-bold text-[#555]">이메일 주소</Label>
              <Input
                readOnly
                value={user.email}
                className="bg-[#f8f9fa] py-4"
              />
            </div>
          </div>
        </div>

        <div className="my-4 rounded-2xl bg-white p-5 shadow-2xl">
          <h3 className="mb-4 text-xl font-bold text-[#333]">계정 관리</h3>

          <div className="grid grid-cols-3 gap-4 max-sm:grid-cols-1">
            <Btn
              bgColor="bg-[#28a745]"
              onClick={() => router.push("/verify?next=/profile/edit")}
            >
              프로필 수정
            </Btn>

            <Btn
              bgColor="bg-[#6c757d]"
              onClick={() => router.push("/verify?next=/profile/password")}
            >
              비밀번호 변경
            </Btn>

            <Btn
              bgColor="bg-[#b81f1f]"
              onClick={() => router.push("/verify?next=/profile/delete")}
            >
              계정 삭제
            </Btn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
