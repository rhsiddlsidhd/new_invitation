import { Switch } from "@/components/atoms/switch";
import { Label } from "@radix-ui/react-label";
import React, { useState } from "react";
import { FieldBase } from "@/types/field";

type SwitchFieldProps = Omit<FieldBase, "defaultValue"> & {
  message?: string;
  defaultValue?: boolean;
};

const SwitchField = ({
  id,
  name,
  children,
  message,
  defaultValue,
}: SwitchFieldProps) => {
  const [info, setInfo] = useState<boolean>(defaultValue ?? false);

  return (
    <div className="border-border flex items-center justify-between rounded-lg border p-4">
      <div className="space-y-0.5">
        <Label htmlFor={id} className="cursor-pointer text-base">
          {children}
        </Label>
        <p className="text-muted-foreground text-sm">{message}</p>
      </div>
      <Switch
        id={id}
        name={name}
        checked={info}
        onCheckedChange={(checked) => setInfo(checked)}
      />
    </div>
  );
};

export default SwitchField;
