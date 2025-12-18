"use client";
import React, { useMemo } from "react";
import { useModalStore } from "@/shared/store/modalStore";
import Label from "@/components/atoms/Label";
import Input from "@/components/atoms/Input";
import Btn from "@/components/atoms/Btn";
import { PanelField } from "@/shared/types";
import useDaumPopup from "@/shared/hooks/useDaumPopup";
import { useUserStore } from "@/domains/user";

const createLocationFields = ({
  weddingDate,
  weddingDetailAddress,
  readOnly,
  address,
  weddingAddress,
  onClick,
}: {
  weddingDate: string;
  readOnly: boolean | undefined;
  address: string;
  weddingAddress: string;
  weddingDetailAddress: string;
  onClick?: () => void;
}): PanelField[] => {
  return [
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
      onClick: onClick,
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
};

const WeddingLocationInfoPanel = ({ readOnly }: { readOnly?: boolean }) => {
  const { weddingDate, weddingAddress, weddingDetailAddress, errors, isUser } =
    useUserStore();

  const { isOpen, setModalOpen } = useModalStore();

  const { address, handleDaumAddressPopup } = useDaumPopup();
  const fields = useMemo(
    () =>
      createLocationFields({
        address,
        readOnly,
        weddingAddress,
        weddingDate,
        weddingDetailAddress,
        onClick: handleDaumAddressPopup,
      }),
    [
      address,
      readOnly,
      weddingAddress,
      weddingDate,
      weddingDetailAddress,
      handleDaumAddressPopup,
    ],
  );

  return (
    <div className="space-y-2">
      {fields.map((field, i) => {
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
      {isUser && (
        <Btn
          type={isOpen ? "submit" : "button"}
          onClick={(e) => {
            if (!isOpen) {
              e.preventDefault();
              setModalOpen({ isOpen: true, type: "wedding-date-info" });
            }
          }}
          className="mt-4 ml-auto block"
        >
          수정하기
        </Btn>
      )}
    </div>
  );
};

export default WeddingLocationInfoPanel;
