import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/atoms/Select";

import React from "react";

const StatusSelect = ({
  value,
  onValueChange,
  disabled,
  items,
  className = "w-full",
  placeholder,
}: {
  value: string;
  onValueChange: (value: string) => void;
  disabled: boolean;
  items: readonly { value: string; label: string }[];
  className?: string;
  placeholder?: string;
}) => {
  return (
    <Select value={value} onValueChange={onValueChange} disabled={disabled}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {items.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default StatusSelect;
