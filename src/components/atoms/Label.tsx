import React from "react";

const Label = ({
  children,
  htmlFor,
}: {
  htmlFor: string;
  children?: React.ReactNode;
}) => {
  return (
    <label htmlFor={htmlFor} className="mb-1 block text-sm text-gray-700">
      {children}
    </label>
  );
};

export default Label;
