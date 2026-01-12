import React from "react";
import { ModalType, useModalStore } from "@/shared/store";
import Label from "@/components/atoms/Label/Label";
import Input from "@/components/atoms/Input/Input";
import Btn from "@/components/atoms/Btn";
import { useWeddingCouple } from "@/__domains/user";
import { CoupleField } from "./type";

const FieldGroup = ({
  fields,
  errors,
  readOnly,
}: {
  fields: CoupleField[];
  errors: Partial<Record<string, string[]>>;
  readOnly: boolean | undefined;
}) => {
  return (
    <>
      {fields.map((field, i) => {
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
    </>
  );
};

export const EditBtn = ({
  isUser,
  type,
}: {
  isUser: boolean;
  type?: ModalType;
}) => {
  const { setModalOpen, isOpen } = useModalStore();

  if (!isUser) return null;

  return (
    <>
      <Btn
        type={isOpen ? "submit" : "button"}
        onClick={(e) => {
          if (!isOpen) {
            e.preventDefault();
            setModalOpen({ isOpen: true, type });
          }
        }}
        className="mt-4 ml-auto block"
      >
        수정하기
      </Btn>
    </>
  );
};

const WeddingCoupleInfoPanel = ({ readOnly }: { readOnly?: boolean }) => {
  const { brideFields, errors, groomFields, isUser } = useWeddingCouple();

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row">
        {[groomFields, brideFields].map((fields, idx) => (
          <div key={idx} className="flex flex-1 flex-col gap-2">
            <FieldGroup fields={fields} errors={errors} readOnly={readOnly} />
          </div>
        ))}
      </div>

      <EditBtn isUser={isUser} type="wedding-party-info" />
    </div>
  );
};

export default WeddingCoupleInfoPanel;
