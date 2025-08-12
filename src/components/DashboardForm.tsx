"use client";
import { signOut } from "@/actions/auth";
import Link from "next/link";
import React from "react";

import InvitationInfoForm from "./organisms/InvitationInfoForm";

const DashboardForm = ({ user }: { user: string }) => {
  return (
    <div className="m-auto w-full max-w-[800px] p-2 sm:mb-24">
      <header className="mb-7 flex justify-between rounded-xl bg-[#f5f5f5] p-5">
        <div>
          <h1>대시보드</h1>
          <p>{user}님 환영합니다.</p>
        </div>
        <button
          className="h-fit shrink-0 grow-0 cursor-pointer rounded bg-[#dc3545] px-4 py-2 text-white"
          onClick={signOut}
        >
          로그아웃
        </button>
      </header>

      <div className="w-full gap-5 space-y-5">
        {/*  */}
        <InvitationInfoForm readOnly={false} />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-5">
          <div
            style={{
              padding: "20px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              backgroundColor: "white",
            }}
          >
            <h3>내 정보</h3>

            <Link
              href={`/profile`}
              style={{
                display: "inline-block",
                marginTop: "10px",
                padding: "8px 16px",
                backgroundColor: "#007cba",
                color: "white",
                textDecoration: "none",
                borderRadius: "4px",
              }}
            >
              프로필 수정
            </Link>
          </div>

          <div
            style={{
              padding: "20px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              backgroundColor: "white",
            }}
          >
            <h3>초대장 관리</h3>
            <p>초대장을 생성하고 관리하세요.</p>
            <Link
              href="/invitations"
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
              초대장 보기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardForm;
/**
 *
 */
