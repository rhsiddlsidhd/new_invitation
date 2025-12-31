import { Input } from "@/components/atoms/Input/Input";
import { Label } from "@/components/atoms/Label/Label";
import React, { HTMLInputTypeAttribute, useState } from "react";

export interface LabeledInputBase {
  id: string;
  name: string;
  children: React.ReactNode;
}

interface LabeledInputProps extends LabeledInputBase {
  type: HTMLInputTypeAttribute | undefined;
  placeholder?: string;
  error?: string;
  required?: boolean;
}

const LabeledInput = ({
  id,
  name,
  children,
  type,
  placeholder,
  required = false,
  error,
}: LabeledInputProps) => {
  const [info, setInfo] = useState("");
  return (
    <div>
      <Label htmlFor={id}>{children}</Label>
      <Input
        value={info}
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        onChange={(e) => setInfo(e.target.value)}
        className={error ? "border-destructive" : ""}
      />
      {error && <p className="text-destructive text-sm">{error}</p>}
    </div>
  );
};

export default LabeledInput;
