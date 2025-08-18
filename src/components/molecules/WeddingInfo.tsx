"use client";
import React, { useState } from "react";
import Label from "../atoms/Label";
import Input from "../atoms/Input";
import { Address, useDaumPostcodePopup } from "react-daum-postcode";
import { Field } from "./WeddingPartyInfo";

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

  const field: Field[] = [
    {
      label: "예식 날짜",
      name: "wedding-date",
      required: true,
      type: "date",
      placeholder: "",
    },
    {
      label: "예식 장소",
      name: "wedding-address",
      required: true,
      type: "text",
      onClick: handleDaumAddressPopup,
      value: address,
    },
    {
      label: "상세 주소",
      name: "wedding-detail-address",
      required: true,
      type: "text",
    },
  ];

  return (
    <div className="flex flex-col gap-2">
      {field.map((field, i) => {
        return (
          <div key={i}>
            <Label htmlFor={field.name}>{field.label}</Label>
            <Input
              type={field.type}
              value={field.value}
              id={field.name}
              name={field.name}
              onClick={!readOnly ? field.onClick : undefined}
              required={field.required}
              readOnly={field.name === "wedding-address" ? true : readOnly}
            />
          </div>
        );
      })}
    </div>
  );
};

export default WeddingInfo;
