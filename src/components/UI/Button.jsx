import React from 'react';

const Button = ({ 
  children, 
  className = '', 
  variant = 'primary', 
  disabled = false, 
  onClick,
  ...props 
}) => {
  const baseStyles = "px-4 py-2 rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    primary: "bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-500",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-500",
    danger: "bg-red-500 hover:bg-red-600 text-white focus:ring-red-500",
    success: "bg-green-500 hover:bg-green-600 text-white focus:ring-green-500"
  };

  const disabledStyles = "opacity-50 cursor-not-allowed";

  return (
    <button
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${disabled ? disabledStyles : ''}
        ${className}
      `}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;