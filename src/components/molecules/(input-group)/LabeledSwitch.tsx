import { Switch } from "@/components/atoms/Switch";
import { Label } from "@radix-ui/react-label";
import React, { useState } from "react";
import { LabeledInputBase } from "./LabeledInput";
type LabeldSwitch = Omit<LabeledInputBase, "defaultValue"> & {
  message?: string;
  defaultValue?: boolean;
};

const LabeledSwitch = ({
  id,
  name,
  children,
  message,
  defaultValue,
}: LabeldSwitch) => {
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

export default LabeledSwitch;
