import React from "react";
import Label from "../atoms/Label";
import Input from "../atoms/Input";
import { useUserStore } from "@/store/userStore";
import { motion } from "framer-motion";
export interface Field {
  label: string;
  name: string;
  type: string;
  required: boolean;
  placeholder?: string;
  onChange?: () => void;
  onClick?: () => void;
  value?: string;
}

const WeddingPartyInfo = ({ readOnly }: { readOnly?: boolean }) => {
  const {
    groomName,
    groomAccount,
    groomPhone,
    brideName,
    brideAccount,
    bridePhone,
    errors,
  } = useUserStore();
  const groomFields: Field[] = [
    {
      label: "신랑 성함",
      name: "groom-name",
      type: "text",
      required: true,
      placeholder: "신랑 성함",
      value: groomName,
    },
    {
      label: "전화 번호",
      name: "groom-phone",
      type: "tel",
      required: true,
      placeholder: "000-0000-0000",
      value: groomPhone,
    },
    {
      label: "계좌 번호",
      name: "groom-account",
      type: "text",
      required: true,
      placeholder: "계좌 번호",
      value: groomAccount,
    },
  ];

  const brideFields: Field[] = [
    {
      label: "신부 성함",
      name: "bride-name",
      type: "text",
      required: true,
      placeholder: "신부 성함",
      value: brideName,
    },
    {
      label: "전화 번호",
      name: "bride-phone",
      type: "tel",
      required: true,
      placeholder: "000-0000-0000",
      value: bridePhone,
    },
    {
      label: "계좌 번호",
      name: "bride-account",
      type: "text",
      required: true,
      placeholder: "계좌 번호",
      value: brideAccount,
    },
  ];

  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      <div className="flex flex-1 flex-col gap-2">
        {groomFields.map((field, i) => {
          return (
            <div key={i} className="flex-1">
              <Label htmlFor={field.name}>
                {field.label}
                <span className="mx-2 text-xs text-red-300">
                  {errors[field.name]?.[0]}
                </span>
              </Label>

              <Input
                name={field.name}
                type={field.type}
                id={field.name}
                readOnly={readOnly}
                placeholder={field.placeholder}
                required={field.required}
                value={readOnly ? field.value : undefined}
                error={errors[field.name]?.[0]}
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
                <span className="mx-2 text-xs text-red-300">
                  {errors[field.name]?.[0]}
                </span>
              </Label>

              <Input
                name={field.name}
                type={field.type}
                id={field.name}
                readOnly={readOnly}
                placeholder={field.placeholder}
                required={field.required}
                value={readOnly ? field.value : undefined}
                error={errors[field.name]?.[0]}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeddingPartyInfo;
