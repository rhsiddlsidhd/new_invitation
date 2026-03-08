import React from "react";

export interface InputFieldBase {
  id: string;
  name: string;
  children: React.ReactNode;
  defaultValue?: string;
}
