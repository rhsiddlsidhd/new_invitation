"use client";

import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/atoms/Dialog/Dialog";
import React from "react";
import { Card } from "@/components/atoms/Card/Card";
import { CopyButton } from "@/components/molecules/CopyButton/CopyButton";
import { PhoneIcon } from "lucide-react";

// Contact 타입을 컴포넌트 내에서 직접 정의하여 의존성 제거
interface Contact {
  relation: string;
  name: string;
  phone: string;
}

const ViewContact = ({ payload }: { payload: Contact[] }) => {
  if (!payload || payload.length === 0) {
    return (
      <div>
        <DialogHeader>
          <DialogTitle>연락처</DialogTitle>
        </DialogHeader>
        <div className="mt-4 text-center text-sm text-muted-foreground">
          <p>혼인 당사자의 요청으로 인해</p>
          <p>연락처가 비공개 되었습니다.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <DialogHeader>
        <DialogTitle>마음 전하실 곳</DialogTitle>
        <DialogDescription>
          아래 연락처를 통해 축하의 마음을 전해보세요.
        </DialogDescription>
      </DialogHeader>

      <div className="mt-6 space-y-3">
        {payload.map((contact) => (
          <Card key={contact.relation} className="p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <p className="text-sm font-semibold text-muted-foreground">
                  {contact.relation}
                </p>
                <p className="text-lg font-bold">{contact.name}</p>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <PhoneIcon className="size-4 text-muted-foreground" />
                  <span className="font-semibold">{contact.phone}</span>
                </div>
                <CopyButton textToCopy={contact.phone} />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ViewContact;
