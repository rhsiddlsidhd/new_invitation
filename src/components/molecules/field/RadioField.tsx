"use client";

import { Label } from "@/components/atoms/Label/Label";
import { RadioGroup, RadioGroupItem } from "@/components/atoms/RadioGroup";
import React, { useState } from "react";
import { LucideIcon } from "lucide-react";
import { InputFieldBase } from "./InputField";

export type RadioFieldOption<T = string> = {
  id: string;
  value: T;
  title: string;
  description?: string;
  icon?: LucideIcon;
};

type RadioFieldProps<T = string> = Omit<InputFieldBase, "children"> & {
  options: RadioFieldOption<T>[];
  defaultValue?: T;
};

const RadioField = <T extends string = string>({
  name,
  options,
  defaultValue = "" as T,
}: RadioFieldProps<T>) => {
  const [info, setInfo] = useState<T>(defaultValue);

  return (
    <RadioGroup
      value={info}
      onValueChange={(val) => setInfo(val)}
      className={"space-y-2"}
      name={name}
    >
      {options.map((option) => {
        const Icon = option.icon;
        return (
          <div
            key={option.id}
            className="border-muted hover:border-muted-foreground/30 hover:bg-accent/50 has-checked:border-primary has-checked:bg-primary/5 has-checkedshadow-sm flex items-center gap-3 rounded-lg border px-4 py-3 transition-all"
          >
            <RadioGroupItem value={option.value} id={option.id} />
            {Icon && <Icon className="text-muted-foreground h-5 w-5" />}
            <Label htmlFor={option.id} className="flex-1 cursor-pointer">
              <span className="text-sm font-medium">{option.title}</span>
              {option.description && (
                <span className="text-muted-foreground/80 ml-2 text-xs">
                  {option.description}
                </span>
              )}
            </Label>
          </div>
        );
      })}
    </RadioGroup>
  );
};

export default RadioField;
