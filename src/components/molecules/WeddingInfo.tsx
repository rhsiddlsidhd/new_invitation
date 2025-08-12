import React, { useState } from "react";
import Label from "../atoms/Label";
import Input from "../atoms/Input";
import { Address, useDaumPostcodePopup } from "react-daum-postcode";

const WeddingInfo = ({ readOnly }: { readOnly?: boolean }) => {
  const [address, setAddress] = useState<string>("");

  const open = useDaumPostcodePopup(
    "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js",
  );

  const handleComplete = (data: Address) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    setAddress(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
  };

  const handleDaumAddressPopup = () => {
    open({ onComplete: handleComplete });
  };

  return (
    <div className="flex flex-col gap-2">
      <div>
        <Label htmlFor="wedding-date">예식 날짜</Label>
        {readOnly ? (
          <Input type="text" name="wedding-date" id="wedding-date" readOnly />
        ) : (
          <Input type="date" name="wedding-date" id="wedding-date" />
        )}
      </div>
      <div className="space-y-3">
        <Label htmlFor="wedding-address">예식 장소</Label>
        <Input
          id="wedding-address"
          name="wedding-address"
          onClick={handleDaumAddressPopup}
          value={address}
          readOnly
        />
        <Label htmlFor="wedding-detail-address">상세 주소</Label>
        {readOnly ? (
          <Input
            id="wedding-detail-address"
            type="text"
            name="wedding-detail-address"
            readOnly
          />
        ) : (
          <Input
            id="wedding-detail-address"
            type="text"
            name="wedding-detail-address"
          />
        )}
      </div>
    </div>
  );
};

export default WeddingInfo;
