"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Btn from "@/components/atoms/Btn";
import Label from "@/components/atoms/Label/Label";
import Input from "@/components/atoms/Input/Input";
import { ParentRoleId } from "./type";
import { useParentField } from "@/domains/user/hooks";
import { parentFieldsVariants } from "./variants";
import { EditBtn } from "../WeddingCoupleInfoPanel";

const WeddingParentInfoPanel = ({ readOnly }: { readOnly?: boolean }) => {
  const { parentFields, isUser, errors } = useParentField();
  const [showParentFields, setShowParentFields] =
    useState<ParentRoleId>("groom-father");

  return (
    <div>
      {/* Btn Wrapper */}
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

      {/* Input Wrapper */}
      <div className="relative min-h-[150px] max-sm:min-h-[206px]">
        {parentFields.map((item) => {
          return (
            <motion.div
              key={item.roleId}
              variants={parentFieldsVariants}
              animate={showParentFields === item.roleId ? "active" : "inActive"}
              className="absolute w-full"
            >
              <div className="flex flex-col sm:flex-row sm:gap-2">
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

      <EditBtn isUser={isUser} type="wedding-parent-info" />
    </div>
  );
};

export default WeddingParentInfoPanel;
