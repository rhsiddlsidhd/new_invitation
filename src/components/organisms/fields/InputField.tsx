import { Input } from "@/components/atoms/input";
import FormField from "@/components/molecules/FormField";
import { InputFieldBase } from "@/types/field";
import React, { HTMLInputTypeAttribute, useState, useEffect } from "react";

export interface InputFieldProps extends InputFieldBase {
  type: HTMLInputTypeAttribute | undefined;
  placeholder?: string;
  error?: string;
  required?: boolean;
  readOnly?: boolean;
  className?: string;
}

const InputField = ({
  id,
  name,
  children,
  type,
  placeholder,
  required = false,
  error,
  defaultValue = "",
  readOnly,
  className,
}: InputFieldProps) => {
  const [info, setInfo] = useState(defaultValue);

  // defaultValue 변경 시 state 업데이트 (data 로딩 후 반영)
  useEffect(() => {
    setInfo(defaultValue);
  }, [defaultValue]);

  return (
    <FormField id={id} label={children} error={error} required={required}>
      <Input
        value={info}
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        onChange={(e) => setInfo(e.target.value)}
        readOnly={readOnly}
        aria-invalid={!!error}
        className={className}
      />
    </FormField>
  );
};

export default InputField;
