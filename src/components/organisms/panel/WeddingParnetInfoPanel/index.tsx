"use client";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { motion } from "framer-motion";
import { useUserStore } from "@/store/userStore";
import { useModalStore } from "@/store/modalStore";
import Btn from "@/components/atoms/Btn";
import Label from "@/components/atoms/Label";
import Input from "@/components/atoms/Input";
import { ParentRoleId } from "./type";
import { fieldTypes, parentRoles } from "./constant";

const WeddingParentInfoPanel = ({ readOnly }: { readOnly?: boolean }) => {
  const { isOpen, setModalOpen } = useModalStore();
  const {
    groomFatherName,
    groomFatherAccount,
    groomFatherPhone,
    groomMotherName,
    groomMotherPhone,
    groomMotherAccount,
    brideMotherName,
    brideMotherPhone,
    brideMotherAccount,
    brideFatherAccount,
    brideFatherName,
    brideFatherPhone,
    errors,
    isUser,
  } = useUserStore();
  const [showParentFields, setShowParentFields] =
    useState<ParentRoleId>("groom-father");
  const fieldRef = useRef<HTMLDivElement>(null);
  const [minHeight, setMinHeight] = useState<number>(0);

  const getFieldValue = useCallback(
    (roleId: string, suffix: string) => {
      switch (`${roleId}-${suffix}`) {
        case "groom-father-name":
          return groomFatherName;
        case "groom-father-phone":
          return groomFatherPhone;
        case "groom-father-account":
          return groomFatherAccount;
        case "groom-mother-name":
          return groomMotherName;
        case "groom-mother-phone":
          return groomMotherPhone;
        case "groom-mother-account":
          return groomMotherAccount;
        case "bride-father-name":
          return brideFatherName;
        case "bride-father-phone":
          return brideFatherPhone;
        case "bride-father-account":
          return brideFatherAccount;
        case "bride-mother-name":
          return brideMotherName;
        case "bride-mother-phone":
          return brideMotherPhone;
        case "bride-mother-account":
          return brideMotherAccount;
        default:
          return "";
      }
    },
    [
      groomFatherName,
      groomFatherPhone,
      groomFatherAccount,
      groomMotherName,
      groomMotherPhone,
      groomMotherAccount,
      brideFatherName,
      brideFatherPhone,
      brideFatherAccount,
      brideMotherName,
      brideMotherPhone,
      brideMotherAccount,
    ],
  );

  const parentFields = useMemo(
    () =>
      parentRoles.map(({ roleId, roleLabel }) => ({
        roleId,
        roleLabel,
        fields: fieldTypes.map(({ label, type, suffix }) => ({
          label,
          name: `${roleId}-${suffix}`,
          type,
          required: false,
          value: getFieldValue(roleId, suffix),
        })),
      })),
    [getFieldValue],
  );

  useEffect(() => {
    if (!fieldRef.current) return;

    const resizeObserver = new ResizeObserver(() => {
      if (!fieldRef.current) return;
      const newHeight = fieldRef.current.offsetHeight;
      setMinHeight((prevHeight) => Math.max(prevHeight, newHeight));
    });

    resizeObserver.observe(fieldRef.current);
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div>
      <div className="mb-2 grid grid-cols-4 gap-2 max-sm:grid-cols-2 sm:max-w-fit">
        {parentFields.map((item, i) => {
          return (
            <Btn
              pending={readOnly && item.fields.every((v) => v.value === "")}
              key={i}
              bgColor="bg-blue-300"
              className="h-fit"
              onClick={(e) => {
                e.preventDefault();
                setShowParentFields(item.roleId);
              }}
            >
              {item.roleLabel}
            </Btn>
          );
        })}
      </div>

      <div style={{ minHeight }} className="relative">
        {parentFields.map((item) => {
          return (
            <motion.div
              key={item.roleId}
              initial={{ opacity: 0, y: "15%", pointerEvents: "none" }}
              animate={
                showParentFields === item.roleId
                  ? { opacity: 1, y: 0, pointerEvents: "auto" }
                  : { opacity: 0, y: "15%", pointerEvents: "none" }
              }
              exit={{ opacity: 0, y: "15%", pointerEvents: "none" }}
              transition={{ ease: "linear" }}
              className="absolute w-full"
              ref={(el) => {
                fieldRef.current = el;
              }}
            >
              <div className="flex flex-col sm:flex-row sm:gap-4">
                {item.fields.slice(0, 2).map((field) => (
                  <div key={field.name} className="flex-1">
                    <Label htmlFor={field.name}>
                      {field.label}
                      <span className="mx-2 text-xs text-red-300">
                        {errors[field.name]?.[0]}
                      </span>
                    </Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      type={field.type}
                      readOnly={readOnly}
                      value={readOnly ? field.value : undefined}
                      error={errors[field.name]?.[0]}
                    />
                  </div>
                ))}
              </div>

              <div className="mt-2 flex-1">
                <Label htmlFor={item.fields[2].name}>
                  {item.fields[2].label}
                </Label>
                <Input
                  id={item.fields[2].name}
                  name={item.fields[2].name}
                  type={item.fields[2].type}
                  readOnly={readOnly}
                  value={readOnly ? item.fields[2].value : undefined}
                  error={errors[item.fields[2].name]?.[0]}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
      {isUser && (
        <Btn
          type={isOpen ? "submit" : "button"}
          onClick={(e) => {
            if (!isOpen) {
              e.preventDefault();
              setModalOpen({ isOpen: true, type: "wedding-parent-info" });
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

export default WeddingParentInfoPanel;
