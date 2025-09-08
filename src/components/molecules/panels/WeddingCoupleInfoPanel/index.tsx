import React, { useMemo } from "react";
import { useUserStore } from "@/store/userStore";
import { useModalStore } from "@/store/modalStore";
import Label from "@/components/atoms/Label";
import Input from "@/components/atoms/Input";
import Btn from "@/components/atoms/Btn";
import { PanelField } from "@/types";

const createCoupleFields = (
  role: "groom" | "bride",
  {
    name,
    phone,
    account,
  }: {
    name: string;
    phone: string;
    account: string;
  },
): PanelField[] => {
  return [
    {
      label: role === "groom" ? "신랑 성함" : "신부 성함",
      name: role === "groom" ? "groom-name" : "bride-name",
      type: "text",
      required: true,
      placeholder: role === "groom" ? "신랑 성함" : "신부 성함",
      value: name,
    },
    {
      label: "전화 번호",
      name: role === "groom" ? "groom-phone" : "bride-phone",
      type: "tel",
      required: true,
      placeholder: "000-0000-0000",
      value: phone,
    },
    {
      label: "계좌 번호",
      name: role === "groom" ? "groom-account" : "bride-account",
      type: "text",
      required: true,
      placeholder: "계좌 번호",
      value: account,
    },
  ];
};

const WeddingCoupleInfoPanel = ({ readOnly }: { readOnly?: boolean }) => {
  const {
    groomName,
    groomAccount,
    groomPhone,
    brideName,
    brideAccount,
    bridePhone,
    errors,
    isUser,
  } = useUserStore();

  const { setModalOpen, isOpen } = useModalStore();

  const groomFields = useMemo(
    () =>
      createCoupleFields("groom", {
        name: groomName,
        phone: groomPhone,
        account: groomAccount,
      }),
    [groomName, groomAccount, groomPhone],
  );
  const brideFields = useMemo(
    () =>
      createCoupleFields("bride", {
        name: brideName,
        phone: bridePhone,
        account: brideAccount,
      }),
    [brideAccount, brideName, bridePhone],
  );

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex flex-1 flex-col gap-2">
          {groomFields.map((field, i) => {
            return (
              <div key={i} className="flex-1">
                <Label htmlFor={field.name}>
                  {field.label}
                  {!readOnly && (
                    <span className="mx-2 text-xs text-red-300">
                      {errors[field.name]?.[0]}
                    </span>
                  )}
                </Label>

                <Input
                  name={field.name}
                  type={field.type}
                  id={field.name}
                  readOnly={readOnly}
                  placeholder={field.placeholder}
                  required={field.required}
                  value={readOnly ? field.value : undefined}
                  error={!readOnly ? errors[field.name]?.[0] : undefined}
                />
              </div>
            );
          })}
        </div>

        <div className="flex flex-1 flex-col gap-2">
          {brideFields.map((field, i) => {
            return (
              <div key={i} className="flex-1">
                <Label htmlFor={field.name}>
                  {field.label}
                  {!readOnly && (
                    <span className="mx-2 text-xs text-red-300">
                      {errors[field.name]?.[0]}
                    </span>
                  )}
                </Label>

                <Input
                  name={field.name}
                  type={field.type}
                  id={field.name}
                  readOnly={readOnly}
                  placeholder={field.placeholder}
                  required={field.required}
                  value={readOnly ? field.value : undefined}
                  error={!readOnly ? errors[field.name]?.[0] : undefined}
                />
              </div>
            );
          })}
        </div>
      </div>

      {isUser && (
        <Btn
          type={isOpen ? "submit" : "button"}
          onClick={(e) => {
            if (!isOpen) {
              e.preventDefault();
              setModalOpen({ isOpen: true, type: "wedding-party-info" });
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

export default WeddingCoupleInfoPanel;
