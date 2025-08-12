import React from "react";

const Input = ({
  placeholder,
  value,
  type,
  name,
  id,

  className,
  onClick,
  onChange,
  readOnly = false,
  required = false,
  disabled,
}: {
  id?: string;
  type?: string;
  name?: string;

  value?: string;
  className?: string;
  placeholder?: string;
  readOnly?: boolean;
  required?: boolean;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <input
      className={`w-full rounded-lg border border-[#ddd] p-2 focus:ring-2 focus:ring-blue-200 focus:outline-none ${className}`}
      placeholder={placeholder}
      id={id}
      type={type}
      name={name}
      value={value}
      onClick={onClick}
      onChange={onChange}
      disabled={disabled}
      readOnly={readOnly}
      required={required}
    />
  );
};

export default Input;
