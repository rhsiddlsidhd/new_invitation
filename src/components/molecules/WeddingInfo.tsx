"use client";
import React, { useState } from "react";
import Label from "../atoms/Label";
import Input from "../atoms/Input";
import { Address, useDaumPostcodePopup } from "react-daum-postcode";
import { Field } from "./WeddingPartyInfo";
import { useUserStore } from "@/store/userStore";

const WeddingInfo = ({ readOnly }: { readOnly?: boolean }) => {
  const [address, setAddress] = useState<string>("");
  const { weddingDate, weddingAddress, weddingDetailAddress, errors } =
    useUserStore();

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
      value: weddingDate,
    },
    {
      label: "예식 장소",
      name: "wedding-address",
      required: true,
      type: "text",
      onClick: handleDaumAddressPopup,
      value: !readOnly ? address : weddingAddress,
    },
    {
      label: "상세 주소",
      name: "wedding-detail-address",
      required: true,
      type: "text",
      value: weddingDetailAddress,
    },
  ];

  return (
    <div className="flex flex-col gap-2">
      {field.map((field, i) => {
        console.log(field.name, readOnly);
        return (
          <div key={i}>
            <Label htmlFor={field.name}>
              {field.label}
              <span className="mx-2 text-xs text-red-300">
                {errors[field.name]?.[0]}
              </span>
            </Label>
            <Input
              type={field.type}
              id={field.name}
              name={field.name}
              onClick={!readOnly ? field.onClick : undefined}
              required={field.required}
              readOnly={field.name !== "wedding-address" ? readOnly : true}
              value={
                readOnly
                  ? field.value
                  : field.name === "wedding-address"
                    ? address
                    : undefined
              }
              error={errors[field.name]?.[0]}
            />
          </div>
        );
      })}
    </div>
  );
};

export default WeddingInfo;
