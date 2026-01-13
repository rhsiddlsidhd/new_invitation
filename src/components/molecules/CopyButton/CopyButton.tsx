"use client";

import { useState, type ComponentProps } from "react";
import { Copy, CheckCircle } from "lucide-react";
import { Btn, buttonVariants } from "@/components/atoms/Btn/Btn";
import { cn } from "@/lib/utils";
import { type VariantProps } from "class-variance-authority";
import { toast } from "sonner";

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

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      toast.success("복사되었습니다.");
      onCopy?.();
    } catch (error) {
      console.error("복사 실패:", error);
      toast.error("복사에 실패했습니다.");
    } finally {
      setTimeout(() => setCopied(false), 2000);
    }
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
