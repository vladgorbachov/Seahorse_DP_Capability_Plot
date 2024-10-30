import React from 'react';

const Input = ({
  label,
  error,
  className = '',
  type = 'text',
  ...props
}) => {
  const baseStyles = "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200";
  
  const errorStyles = "border-red-500 focus:ring-red-500";
  const disabledStyles = "bg-gray-100 cursor-not-allowed";

  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      
      <input
        type={type}
        className={`
          ${baseStyles}
          ${error ? errorStyles : 'border-gray-300'}
          ${props.disabled ? disabledStyles : ''}
          ${className}
        `}
        {...props}
      />
      
      {error && (
        <p className="text-sm text-red-600 mt-1">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;