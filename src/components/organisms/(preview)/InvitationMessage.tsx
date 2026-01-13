"use client";

import { Btn } from "@/components/atoms/Btn/Btn";
import { Card } from "@/components/atoms/Card/Card";
import SectionBody from "@/components/molecules/(preview)/SectionBody";
import { useGuestbookModalStore } from "@/store/guestbook.modal.store";

// 이 컴포넌트가 받을 데이터 구조를 정의합니다.
// 이 타입들은 이제 매퍼 파일과 이 컴포넌트에서만 사용됩니다.
export interface Contact {
  relation: string;
  name: string;
  phone: string;
}

interface Party {
  parentNames: string;
  name: string;
  title: string;
  contacts: Contact[];
}

interface InvitationMessageProps {
  parties: Party[];
}

const pinMessage = [
  "저희 두 사람의 소중한 첫걸음에",
  "귀한 걸음 하시어 ",
  "축복해 주시면 감사하겠습니다.",
];

export function InvitationMessage({ parties }: InvitationMessageProps) {
  const { setIsOpen } = useGuestbookModalStore();

  return (
    <SectionBody title="INVITATION" subTitle="소중한 분들을 초대합니다.">
      <div className="text-muted-foreground mb-12 leading-relaxed text-balance whitespace-pre-line">
        {pinMessage.map((msg) => (
          <p key={msg}>{msg}</p>
        ))}
      </div>

      <div className="space-y-8">
        {/* 서버에서 가공된 parties prop을 직접 순회하여 렌더링 */}
        {parties.map((party) => (
          <Card
            key={party.title}
            className="flex flex-col items-center shadow-2xs"
          >
            {/* 이름/부모님 정보 표시 그리드 */}
            <div className="grid w-full grid-cols-2 justify-items-center gap-4 text-sm">
              <div className="text-muted-foreground col-span-1 text-left">
                <span>{party.title} </span>
              </div>
              <div className="text-muted-foreground col-span-1 text-left">
                <span className="text-foreground font-semibold">
                  {party.name}
                </span>
              </div>

              <div className="text-muted-foreground col-span-2 text-right">
                {party.parentNames}
              </div>
            </div>

            {/* 연락하기 버튼 */}
            <Btn
              onClick={() =>
                setIsOpen({
                  isOpen: true,
                  type: "VIEW_CONTACT",
                  payload: party.contacts, // `party` 객체 안의 contacts 배열을 payload로 사용
                })
              }
              variant="secondary"
              className="hover:bg-secondary-foreground hover:text-secondary mt-4 cursor-pointer rounded-full border px-4 py-2 text-sm"
            >
              {`${party.title}측 연락하기`}
            </Btn>
          </Card>
        ))}
      </div>
    </SectionBody>
  );
}
