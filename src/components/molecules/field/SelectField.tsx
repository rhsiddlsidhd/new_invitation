import { Label } from "@/components/atoms/Label/Label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/atoms/Select";
import React, { useState } from "react";
import { InputFieldBase } from "./InputField";

type SelectFieldProps = InputFieldBase & { placeholder: string; data: string[] };

const SelectField = ({
  id,
  name,
  children,
  placeholder,
  defaultValue,
  data,
}: SelectFieldProps) => {
  const [info, setInfo] = useState<string | undefined>(defaultValue);

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{children}</Label>
      <Select
        name={name}
        value={info ?? ""}
        onValueChange={(value) => setInfo(value)}
      >
        <SelectTrigger id={id}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {data.map((value) => (
            <SelectItem key={value} value={value}>
              {value}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectField;
