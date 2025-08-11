import { signOut } from "@/actions/auth";
import Link from "next/link";
import React from "react";
import Label from "./atoms/Label";
import Input from "./atoms/Input";
import Img from "./atoms/Img";
import GalleryPreview from "./molecules/GalleryPreview";

type ParentRoleId =
  | "groom-father"
  | "groom-mother"
  | "bride-father"
  | "bride-mother";

type ParentRoleName = "신랑측 부" | "신랑측 모" | "신부측 부" | "신부측 모";

const DashboardForm = ({ user }: { user: string }) => {
  const btnNames: { id: ParentRoleId; name: ParentRoleName }[] = [
    { id: "groom-father", name: "신랑측 부" },
    { id: "groom-mother", name: "신랑측 모" },
    { id: "bride-father", name: "신부측 부" },
    { id: "bride-mother", name: "신부측 모" },
  ];

  return (
    <div className="m-auto w-full max-w-[800px] p-2">
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
        <div className="rounded-xl border border-[#ddd] bg-white p-6">
          <h3 className="mb-4 text-lg font-semibold">청첩장 정보</h3>
          <div className="flex flex-col gap-4">
            {/* Groom && Bride Info */}
            <div className="flex flex-col gap-4 sm:flex-row">
              {/* 신랑 Info */}
              <div className="flex flex-1 flex-col gap-2">
                <div>
                  <Label htmlFor="groom-name">신랑 성함</Label>
                  <Input
                    placeholder="예: 홍길동"
                    type="text"
                    id="groom-name"
                    readOnly
                  />
                </div>

                <div className="flex-1">
                  <Label htmlFor="groom-phone">전화번호</Label>
                  <Input
                    id="groom-phone"
                    type="tel"
                    readOnly
                    placeholder="전화번호"
                  />
                </div>

                <div>
                  <Label htmlFor="groom-account">계좌 번호</Label>
                  <Input
                    placeholder="계좌 번호"
                    type="text"
                    id="groom-account"
                    readOnly
                  />
                </div>
              </div>

              {/* 신부 Info */}
              <div className="flex flex-1 flex-col gap-2">
                <div>
                  <Label htmlFor="bride-name">신부 성함</Label>
                  <Input
                    placeholder="예: 김영희"
                    type="text"
                    id="bride-name"
                    readOnly
                  />
                </div>
                <div className="flex-1">
                  <Label htmlFor="bride-phone">전화번호</Label>
                  <Input
                    id="bride-phone"
                    type="tel"
                    placeholder="전화번호"
                    readOnly
                  />
                </div>
                <div>
                  <Label htmlFor="bride-account">계좌 번호</Label>
                  <Input
                    placeholder="계좌 번호"
                    type="text"
                    id="bride-account"
                    readOnly
                  />
                </div>
              </div>
            </div>

            <hr className="my-2 border-gray-200" />

            {/* Wedding Info */}
            <div className="flex flex-col gap-2">
              <div>
                <Label htmlFor="wedding-date">예식 날짜</Label>
                <Input id="wedding-date" readOnly />
              </div>
              <div>
                <Label htmlFor="wedding-address">예식 장소</Label>
                <Input id="wedding-address" readOnly />
              </div>
            </div>

            <hr className="my-2 border-gray-200" />

            <div className="flex gap-1">
              {btnNames.map((n) => {
                return (
                  <button
                    className="rounded-xl border-2 px-1 py-2 text-xs"
                    key={n.id}
                  >
                    {n.name}
                  </button>
                );
              })}
            </div>
            {/* Optional Parent Info */}
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="flex-1">
                <Label htmlFor="parent-name">성함</Label>
                <Input id="parent-name" type="text" readOnly />
              </div>
              <div className="flex-1">
                <Label htmlFor="parent-phone">전화번호</Label>
                <Input id="parent-phone" type="tel" readOnly />
              </div>
            </div>
            <div className="flex-1">
              <Label htmlFor="parent-account">계좌번호</Label>
              <Input id="parent-account" type="text" readOnly />
            </div>

            <hr className="my-2 border-gray-200" />

            {/* 썸네일 (최대 2장) */}
            <div className="flex justify-center gap-4 p-4">
              {[null, null].map((url, idx) => (
                <div
                  key={idx}
                  className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-lg border border-gray-200 bg-gray-50"
                >
                  {url ? (
                    <Img src="/marriage.jpg" />
                  ) : (
                    <span className="text-sm text-gray-400">
                      썸네일이 없습니다
                    </span>
                  )}
                </div>
              ))}
            </div>
            <span className="block text-center text-xs text-gray-500">
              현재 등록된 썸네일 (최대 2장)
            </span>

            <hr className="my-2 border-gray-200" />

            {/* 갤러리 Priview */}

            <GalleryPreview />
          </div>
        </div>
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
