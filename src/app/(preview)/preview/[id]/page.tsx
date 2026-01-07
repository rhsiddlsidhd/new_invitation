import GuestBookAction from "@/components/organisms/(preview)/GuestBookAction";
import { getGuestbookService } from "@/services/guestbook.service";
import React from "react";
// 695dfae9ad249322407807a8 고정의 ID
const COUPLEINFO_ID = process.env.PREVIEW_COUPLEINFO_ID;

// VIEW 경우
//  COUPLEINFO_ID 에 해당하는 방명록 게시물을 useGuestbookModalStore 값에 payload로 데이터 형태를 던져줌
// payload.map .... 뿌려주기

// Write 의 경우
// COUPLEINFO_ID 를 payload 로 전달받아서 action 에서 COUPLEINFO_ID 값을 넣은 데이터 생성
const Page = async () => {
  if (!COUPLEINFO_ID) throw new Error("COUPLEINFO_ID is required");
  const data = await getGuestbookService(COUPLEINFO_ID);

  return (
    <div className="relative">
      <GuestBookAction id={COUPLEINFO_ID} data={data} />
    </div>
  );
};

export default Page;
