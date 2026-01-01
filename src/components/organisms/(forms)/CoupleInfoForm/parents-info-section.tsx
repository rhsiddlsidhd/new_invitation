"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/atoms/Card/Card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/atoms/Collapsible";
import BankAccount from "@/components/molecules/(input-group)/BankAccount";
import LabeledInput from "@/components/molecules/(input-group)/LabeledInput";
import { ChevronDown } from "lucide-react";

import { useState } from "react";

type ParentRole = "father" | "mother";

const PARENTS: { id: ParentRole; title: string }[] = [
  { id: "father", title: "아버님" },
  { id: "mother", title: "어머님" },
];

export function ParentsInfoSection() {
  const [groomParentsOpen, setGroomParentsOpen] = useState(false);
  const [brideParentsOpen, setBrideParentsOpen] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle>혼주 정보</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Groom Parents */}
        <Collapsible open={groomParentsOpen} onOpenChange={setGroomParentsOpen}>
          <CollapsibleTrigger className="bg-muted/50 hover:bg-muted flex w-full items-center justify-between rounded-lg p-4 transition-colors">
            <h3 className="text-foreground font-semibold">신랑측 혼주 정보</h3>
            <ChevronDown
              className={`text-muted-foreground h-5 w-5 transition-transform ${
                groomParentsOpen ? "rotate-180" : ""
              }`}
            />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4">
            <div className="space-y-6 px-4">
              {PARENTS.map((parent) => (
                <div className="space-y-4" key={parent.id}>
                  <h4 className="text-muted-foreground text-sm font-medium">
                    {parent.title}
                  </h4>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <LabeledInput
                      placeholder="이름"
                      id={`groomParents.${parent.id}.name`}
                      name={`groom_parents_${parent.id}_name`}
                      type="text"
                    >
                      이름
                    </LabeledInput>
                    <LabeledInput
                      id={`groomParents.${parent.id}.phone`}
                      name={`groom_parents_${parent.id}_phone`}
                      type="tel"
                      placeholder="010-1234-5678"
                    >
                      연락처
                    </LabeledInput>
                    <div className="col-span-2">
                      <BankAccount id={`groom_parents_${parent.id}`} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Bride Parents */}
        <Collapsible open={brideParentsOpen} onOpenChange={setBrideParentsOpen}>
          <CollapsibleTrigger className="bg-muted/50 hover:bg-muted flex w-full items-center justify-between rounded-lg p-4 transition-colors">
            <h3 className="text-foreground font-semibold">신부측 혼주 정보</h3>
            <ChevronDown
              className={`text-muted-foreground h-5 w-5 transition-transform ${
                brideParentsOpen ? "rotate-180" : ""
              }`}
            />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4">
            <div className="space-y-6 px-4">
              {PARENTS.map((parent) => (
                <div className="space-y-4" key={parent.id}>
                  <h4 className="text-muted-foreground text-sm font-medium">
                    {parent.title}
                  </h4>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <LabeledInput
                      placeholder="이름"
                      id={`brideParents.${parent.id}.name`}
                      name={`bride_parents_${parent.id}_name`}
                      type="text"
                    >
                      이름
                    </LabeledInput>
                    <LabeledInput
                      id={`brideParents.${parent.id}.phone`}
                      name={`bride_parents_${parent.id}_phone`}
                      type="tel"
                      placeholder="010-1234-5678"
                    >
                      연락처
                    </LabeledInput>
                    <div className="col-span-2">
                      <BankAccount id={`bride_parents_${parent.id}`} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
}
