interface Person {
  name: string;
}

interface ParentsInfo {
  father?: Person;
  mother?: Person;
}

interface InvitationMessageProps {
  message: string;
  groomName: string;
  brideName: string;
  groomParents?: ParentsInfo;
  brideParents?: ParentsInfo;
}

export function InvitationMessage({
  message,
  groomName,
  brideName,
  groomParents,
  brideParents,
}: InvitationMessageProps) {
  return (
    <section className="bg-background px-6 py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-foreground mb-8 font-serif text-3xl">초대합니다</h2>

        <div className="text-muted-foreground mb-12 leading-relaxed text-balance whitespace-pre-line">
          {message}
        </div>

        {/* Parents & Couple Names */}
        <div className="space-y-8 text-sm">
          {/* Groom Side */}
          <div className="flex flex-col items-center gap-2">
            <div className="text-muted-foreground flex items-center gap-3">
              {groomParents?.father && <span>{groomParents.father.name}</span>}
              <span>·</span>
              {groomParents?.mother && <span>{groomParents.mother.name}</span>}
              <span className="text-foreground">의 아들</span>
            </div>
            <div className="text-foreground text-2xl font-semibold">
              {groomName}
            </div>
          </div>

          {/* Bride Side */}
          <div className="flex flex-col items-center gap-2">
            <div className="text-muted-foreground flex items-center gap-3">
              {brideParents?.father && <span>{brideParents.father.name}</span>}
              <span>·</span>
              {brideParents?.mother && <span>{brideParents.mother.name}</span>}
              <span className="text-foreground">의 딸</span>
            </div>
            <div className="text-foreground text-2xl font-semibold">
              {brideName}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
