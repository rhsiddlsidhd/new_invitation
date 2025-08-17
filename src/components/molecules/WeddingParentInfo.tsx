"use client";
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Label from "../atoms/Label";
import Input from "../atoms/Input";
import { Field } from "./WeddingPartyInfo";
import Btn from "../atoms/Btn";

type ParentRoleId =
  | "groom-father"
  | "groom-mother"
  | "bride-father"
  | "bride-mother";

type ParentRoleName = "신랑측 부" | "신랑측 모" | "신부측 부" | "신부측 모";

const WeddingParentInfo = ({ readOnly }: { readOnly?: boolean }) => {
  const [showParentFields, setShowParentFields] =
    useState<ParentRoleId>("groom-father");
  const fieldRef = useRef<HTMLDivElement>(null);
  const [minHeight, setMinHeight] = useState<number>(0);

  const parentFields: {
    roleId: ParentRoleId;
    roleName: ParentRoleName;
    fields: Field[];
  }[] = [
    {
      roleId: "groom-father",
      roleName: "신랑측 부",
      fields: [
        {
          label: "성함",
          name: "groom-father-name",
          type: "text",
          required: false,
        },
        {
          label: "전화번호",
          name: "groom-father-phone",
          type: "tel",
          required: false,
        },
        {
          label: "계좌번호",
          name: "groom-father-account",
          type: "tel",
          required: false,
        },
      ],
    },
    {
      roleId: "groom-mother",
      roleName: "신랑측 모",
      fields: [
        {
          label: "성함",
          name: "groom-mother-name",
          type: "text",
          required: false,
        },
        {
          label: "전화번호",
          name: "groom-mother-phone",
          type: "tel",
          required: false,
        },
        {
          label: "계좌번호",
          name: "groom-mother-account",
          type: "tel",
          required: false,
        },
      ],
    },
    {
      roleId: "bride-father",
      roleName: "신부측 부",
      fields: [
        {
          label: "성함",
          name: "bride-father-name",
          type: "text",
          required: false,
        },
        {
          label: "전화번호",
          name: "bride-father-phone",
          type: "tel",
          required: false,
        },
        {
          label: "계좌번호",
          name: "bride-father-account",
          type: "tel",
          required: false,
        },
      ],
    },
    {
      roleId: "bride-mother",
      roleName: "신부측 모",
      fields: [
        {
          label: "성함",
          name: "bride-mother-name",
          type: "text",
          required: false,
        },
        {
          label: "전화번호",
          name: "bride-mother-phone",
          type: "tel",
          required: false,
        },
        {
          label: "계좌번호",
          name: "bride-mother-account",
          type: "tel",
          required: false,
        },
      ],
    },
  ];

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
      <div className="flex gap-1 space-y-4">
        {parentFields.map((item, i) => {
          return (
            <Btn
              key={i}
              bgColor="bg-blue-300"
              className="h-fit"
              onClick={(e) => {
                e.preventDefault();
                setShowParentFields(item.roleId);
              }}
            >
              {item.roleName}
            </Btn>
          );
        })}
      </div>

      <div style={{ minHeight }} className="relative">
        {/* Optional Parent Info */}
        <AnimatePresence>
          {parentFields.map((v) => {
            return (
              <motion.div
                key={v.roleId}
                initial={{ opacity: 0, y: "15%", pointerEvents: "none" }}
                animate={
                  showParentFields === v.roleId
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
                {/* 성함/전화번호 한 줄 */}
                <div className="flex flex-col sm:flex-row sm:gap-4">
                  {v.fields.slice(0, 2).map((field) => (
                    <div key={field.name} className="flex-1">
                      <Label htmlFor={field.name}>{field.label}</Label>
                      <Input
                        id={field.name}
                        name={field.name}
                        type={field.type}
                        readOnly={readOnly}
                        placeholder={field.placeholder}
                      />
                    </div>
                  ))}
                </div>
                {/* 계좌번호는 아래 한 줄 */}
                <div className="mt-2 flex-1">
                  <Label htmlFor={v.fields[2].name}>{v.fields[2].label}</Label>
                  <Input
                    id={v.fields[2].name}
                    name={v.fields[2].name}
                    type={v.fields[2].type}
                    readOnly={readOnly}
                    placeholder={v.fields[2].placeholder}
                  />
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default WeddingParentInfo;
