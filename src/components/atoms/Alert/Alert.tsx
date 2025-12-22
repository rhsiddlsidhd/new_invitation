import React from "react";
import { AlertProps, AlertType } from "./type";

const Alert = ({ type = "info", children, className }: AlertProps) => {
  const config: { [key in AlertType]: string } = {
    error: "bg-[#fee] text-red-700 ",
    success: "bg-[#f0fff4] text-green-700 ",
    info: "bg-[#ebf8ff] text-blue-700 ",
    warning: "bg-[#fffaf0] text-yellow-700 ",
  };

  return (
    <p className={`rounded-sm p-2 text-xs ${config[type]} ${className}`}>
      {children}
    </p>
  );
};

export default Alert;
