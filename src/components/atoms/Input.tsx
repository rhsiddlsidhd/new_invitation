import React from "react";
import { motion } from "framer-motion";

const Input = ({
  placeholder,
  value,
  type,
  name,
  id,
  error,
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
  error?: string;
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="relative">
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
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: error ? 1 : 0 }}
        className="absolute inset-0 h-full w-full rounded-lg border-1 border-red-300"
      />
    </div>
  );
};

export default Input;
