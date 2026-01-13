"use client";

import { useState, type ComponentProps } from "react";
import { Copy, CheckCircle } from "lucide-react";
import { Btn, buttonVariants } from "@/components/atoms/Btn/Btn";
import { cn } from "@/lib/utils";
import { type VariantProps } from "class-variance-authority";

// Btn 컴포넌트의 props 타입을 기반으로 CopyButton의 props 타입을 정의합니다.
export type CopyButtonProps = ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    textToCopy: string;
    onCopy?: () => void;
  };

export function CopyButton({
  textToCopy,
  onCopy,
  className,
  ...props
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    alert("복사되었습니다."); // 기존 로직과 동일하게 alert 유지
    if (onCopy) {
      onCopy();
    }
    setTimeout(() => setCopied(false), 2000); // 2초 후 아이콘 원래대로
  };

  return (
    <Btn
      variant="ghost"
      size="sm"
      onClick={handleCopy}
      className={cn("cursor-pointer", className)}
      {...props}
    >
      {copied ? (
        <CheckCircle className="h-4 w-4 text-green-500" />
      ) : (
        <Copy className="h-4 w-4" />
      )}
      <span className="sr-only">Copy to clipboard</span>
    </Btn>
  );
}
