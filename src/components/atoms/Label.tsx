import React from "react";

const Label = ({
  children,
  htmlFor,
  className,
}: {
  htmlFor: string;
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`mb-1 block text-sm text-gray-700 ${className}`}
    >
      {children}
    </label>
  );
};

export default Label;
