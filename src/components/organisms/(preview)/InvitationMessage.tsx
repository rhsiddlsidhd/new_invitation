import SectionBody from "@/components/molecules/(preview)/SectionBody";
import { useMemo } from "react";

interface Person {
  name: string;
}

interface ParentsInfo {
  father?: Person;
  mother?: Person;
}

interface InvitationMessageProps {
  groomName: string;
  brideName: string;
  groomParents?: ParentsInfo;
  brideParents?: ParentsInfo;
}

const pinMessage = [
  "저희 두 사람의 소중한 첫걸음에",
  "귀한 걸음 하시어 ",
  "축복해 주시면 감사하겠습니다.",
];

function getParentNamesString(parents: ParentsInfo | undefined): string {
  const names = [parents?.father?.name, parents?.mother?.name].filter(Boolean);
  return names.join(" · ");
}

export function InvitationMessage({
  groomName,
  brideName,
  groomParents,
  brideParents,
}: InvitationMessageProps) {
  const parties = useMemo(() => {
    const groomParentNames = getParentNamesString(groomParents);
    const brideParentNames = getParentNamesString(brideParents);
    return [
      {
        parentNames: groomParentNames,
        name: groomName,
        hanja: "子",
        title: "신랑",
      },
      {
        parentNames: brideParentNames,
        name: brideName,
        hanja: "女",
        title: "신부",
      },
    ];
  }, [groomParents, brideParents, groomName, brideName]);

  return (
    <SectionBody title="INVITATION" subTitle="소중한 분들을 초대합니다.">
      <div className="text-muted-foreground mb-12 leading-relaxed text-balance whitespace-pre-line">
        {pinMessage.map((msg) => (
          <p key={msg}>{msg}</p>
        ))}
      </div>

      <div className="space-y-8">
        {parties.map((party) => (
          <div
            key={party.title}
            className="grid grid-cols-5 items-center justify-items-center gap-2 text-sm"
          >
            <div className="text-muted-foreground col-span-2 text-right">
              {party.parentNames}
            </div>
            <div className="text-muted-foreground col-span-1 text-left font-bold">
              {party.parentNames && <span> {party.hanja} </span>}
            </div>
            <div className="text-muted-foreground col-span-1 text-left">
              <span>{party.title} </span>
            </div>
            <div className="text-muted-foreground col-span-1 text-left">
              <span className="text-foreground font-semibold">
                {party.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </SectionBody>
  );
}
