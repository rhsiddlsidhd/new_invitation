import React from "react";
import Label from "../atoms/Label";
import Input from "../atoms/Input";
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
  const groomFields: Field[] = [
    {
      label: "신랑 성함",
      name: "groom-name",
      type: "text",
      required: true,
      placeholder: "신랑 성함",
    },
    {
      label: "전화 번호",
      name: "groom-phone",
      type: "tel",
      required: true,
      placeholder: "000-0000-0000",
    },
    {
      label: "계좌 번호",
      name: "groom-account",
      type: "text",
      required: true,
      placeholder: "계좌 번호",
    },
  ];

  const brideFields: Field[] = [
    {
      label: "신부 성함",
      name: "bride-name",
      type: "text",
      required: true,
      placeholder: "신부 성함",
    },
    {
      label: "전화 번호",
      name: "bride-phone",
      type: "tel",
      required: true,
      placeholder: "000-0000-0000",
    },
    {
      label: "계좌 번호",
      name: "bride-account",
      type: "text",
      required: true,
      placeholder: "계좌 번호",
    },
  ];

  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      <div className="flex flex-1 flex-col gap-2">
        {groomFields.map((field, i) => {
          return (
            <div key={i} className="flex-1">
              <Label htmlFor={field.name}>{field.label}</Label>
              <Input
                name={field.name}
                type={field.type}
                id={field.name}
                readOnly={readOnly}
                placeholder={field.placeholder}
              />
            </div>
          );
        })}
      </div>

      <div className="flex flex-1 flex-col gap-2">
        {brideFields.map((field, i) => {
          return (
            <div key={i} className="flex-1">
              <Label htmlFor={field.name}>{field.label}</Label>
              <Input
                name={field.name}
                type={field.type}
                id={field.name}
                readOnly={readOnly}
                placeholder={field.placeholder}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeddingPartyInfo;
