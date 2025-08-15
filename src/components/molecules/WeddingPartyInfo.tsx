import React from "react";
import Label from "../atoms/Label";
import Input from "../atoms/Input";

const WeddingPartyInfo = ({ readOnly }: { readOnly?: boolean }) => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      <div className="flex flex-1 flex-col gap-2">
        <div>
          <Label htmlFor="groom-name">신랑 성함</Label>
          <Input
            placeholder="예: 홍길동"
            type="text"
            name="groom-name"
            id="groom-name"
            readOnly={readOnly}
          />
        </div>

        <div className="flex-1">
          <Label htmlFor="groom-phone">전화번호</Label>
          <Input
            id="groom-phone"
            type="tel"
            name="groom-phone"
            readOnly={readOnly}
            placeholder="000-0000-0000"
          />
        </div>

        <div>
          <Label htmlFor="groom-account">계좌 번호</Label>
          <Input
            placeholder="계좌 번호"
            type="text"
            id="groom-account"
            name="groom-account"
            readOnly={readOnly}
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2">
        <div>
          <Label htmlFor="bride-name">신부 성함</Label>
          <Input
            placeholder="예: 김영희"
            type="text"
            id="bride-name"
            name="bride-name"
            readOnly={readOnly}
          />
        </div>
        <div className="flex-1">
          <Label htmlFor="bride-phone">전화번호</Label>
          <Input
            id="bride-phone"
            name="bride-phone"
            type="tel"
            placeholder="000-0000-0000"
            readOnly={readOnly}
          />
        </div>
        <div>
          <Label htmlFor="bride-account">계좌 번호</Label>
          <Input
            placeholder="계좌 번호"
            name="bride-account"
            type="text"
            id="bride-account"
            readOnly={readOnly}
          />
        </div>
      </div>
    </div>
  );
};

export default WeddingPartyInfo;
