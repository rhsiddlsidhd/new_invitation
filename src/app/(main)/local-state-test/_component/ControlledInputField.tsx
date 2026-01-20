// "use client";

// import { Input } from "@/components/atoms/Input/Input";
// import { Label } from "@/components/atoms/Label/Label";
// import Alert from "@/components/atoms/Alert/Alert";
// import { cn } from "@/lib/utils";
// import React from "react";

// interface ControlledInputFieldProps {
//   id: string;
//   name: string;
//   children: React.ReactNode; // for the Label
//   value: string; // Required
//   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Required
//   type?: React.HTMLInputTypeAttribute;
//   placeholder?: string;
//   error?: string;
//   className?: string;
//   readOnly?: boolean;
// }

// const ControlledInputField = ({
//   id,
//   name,
//   children,
//   value,
//   onChange,
//   type,
//   placeholder,
//   error,
//   className,
//   readOnly,
// }: ControlledInputFieldProps) => {
//   // No internal useState for the value. It is fully controlled by the parent.
//   return (
//     <div className="space-y-2">
//       <Label htmlFor={id}>{children}</Label>
//       <Input
//         id={id}
//         name={name}
//         value={value} // Directly from props
//         onChange={onChange} // Directly from props
//         type={type}
//         placeholder={placeholder}
//         readOnly={readOnly}
//         className={cn(error ? "border-destructive" : "", className)}
//       />
//       {error && <Alert type="error">{error}</Alert>}
//     </div>
//   );
// };

// export default ControlledInputField;

"use client";

import { Input } from "@/components/atoms/Input/Input";
import { Label } from "@/components/atoms/Label/Label";
import Alert from "@/components/atoms/Alert/Alert";
import { cn } from "@/lib/utils";
import React, { memo } from "react";

interface ControlledInputFieldProps {
  id: string;
  name: string;
  children: React.ReactNode;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  error?: string;
  className?: string;
  readOnly?: boolean;
}

// React.memo로 감싸서 Props가 동일하면 리렌더링 방지
const ControlledInputField = memo(
  ({
    id,
    name,
    children,
    value,
    onChange,
    type,
    placeholder,
    error,
    className,
    readOnly,
  }: ControlledInputFieldProps) => {
    console.log(`Rendering field: ${name}`); // 최적화 확인용 로그

    return (
      <div className="space-y-2">
        <Label htmlFor={id}>{children}</Label>
        <Input
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          type={type}
          placeholder={placeholder}
          readOnly={readOnly}
          className={cn(error ? "border-destructive" : "", className)}
        />
        {error && <Alert type="error">{error}</Alert>}
      </div>
    );
  },
);

ControlledInputField.displayName = "ControlledInputField";

export default ControlledInputField;
