import React from "react";

type AlertType = "error" | "success" | "info" | "warning";

type AlertProps = {
  type?: AlertType;
  children: React.ReactNode;
  className?: string;
};

const Alert = ({ type = "info", children, className }: AlertProps) => {
  const config: { [key in AlertType]: string } = {
    error: "bg-[#fee] text-red-700 ",
    success: "bg-[#f0fff4] text-green-700 ",
    info: "bg-[#ebf8ff] text-blue-700 ",
    warning: "bg-[#fffaf0] text-yellow-700 ",
  };

  return (
    <div className={`rounded-sm p-2 ${config[type]} ${className}`}>
      {children}
    </div>
  );
};

export default Alert;
