import React from "react";

const Input = ({
  placeholder,
  value,
  type,
  id,
  onChange,
  readOnly = false,
  required = false,
}: {
  id?: string;
  type?: string;
  value?: string;
  placeholder?: string;
  readOnly?: boolean;
  required?: boolean;

  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <input
      className="w-full rounded-lg border border-[#ddd] p-2 focus:ring-2 focus:ring-blue-200 focus:outline-none"
      placeholder={placeholder}
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      readOnly={readOnly}
      required={required}
    />
  );
};

export default Input;
