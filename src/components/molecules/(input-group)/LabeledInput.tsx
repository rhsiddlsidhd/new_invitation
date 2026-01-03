import Alert from "@/components/atoms/Alert/Alert";
import { Input } from "@/components/atoms/Input/Input";
import { Label } from "@/components/atoms/Label/Label";
import React, { HTMLInputTypeAttribute, useState } from "react";

export interface LabeledInputBase {
  id: string;
  name: string;
  children: React.ReactNode;
}

export interface LabeledInputProps extends LabeledInputBase {
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
    <div className="space-y-2">
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
      {error && <Alert type="error">{error}</Alert>}
    </div>
  );
};

export default LabeledInput;
