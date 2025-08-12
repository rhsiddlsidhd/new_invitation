import React from "react";

const Input = ({
  placeholder,
  value,
  type,
  name,
  id,
  onClick,
  onChange,
  readOnly = false,
  required = false,
}: {
  id?: string;
  type?: string;
  name?: string;
  value?: string;
  placeholder?: string;
  readOnly?: boolean;
  required?: boolean;
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <input
      className="w-full rounded-lg border border-[#ddd] p-2 focus:ring-2 focus:ring-blue-200 focus:outline-none"
      placeholder={placeholder}
      id={id}
      type={type}
      name={name}
      value={value}
      onClick={onClick}
      onChange={onChange}
      readOnly={readOnly}
      required={required}
    />
  );
};

export default Input;
