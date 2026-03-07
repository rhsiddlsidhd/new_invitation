import { Label } from "@/components/atoms/label";
import React from "react";

interface FormControlProps {
  id?: string;
  label: React.ReactNode;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}

/**
 * 모든 폼 필드의 공통 레이아웃을 담당하는 순수 컴포넌트
 */
const FormControl = ({
  id,
  label,
  error,
  required,
  children,
}: FormControlProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="cursor-pointer">
        {label} {required && <span className="text-destructive ml-0.5">*</span>}
      </Label>
      {children}
      {error && <p className="text-destructive text-sm font-medium">{error}</p>}
    </div>
  );
};

export default FormControl;
