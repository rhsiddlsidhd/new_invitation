import FormField from "@/components/molecules/FormField";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/atoms/select";
import React, { useState } from "react";
import { InputFieldBase } from "@/types/field";

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
    <FormField id={id} label={children}>
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
    </FormField>
  );
};

export default SelectField;
