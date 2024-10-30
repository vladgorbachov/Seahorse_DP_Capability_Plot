import React from 'react';

const Card = ({
  children,
  className = '',
  variant = 'default',
  onClick,
  ...props
}) => {
  const variants = {
    default: 'bg-white',
    primary: 'bg-blue-50',
    warning: 'bg-yellow-50',
    danger: 'bg-red-50'
  };

  const baseStyles = "rounded-lg shadow-md p-4 transition-shadow duration-200";
  const interactiveStyles = onClick ? "cursor-pointer hover:shadow-lg" : "";

  return (
    <div
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${interactiveStyles}
        ${className}
      `}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = '' }) => (
  <div className={`mb-4 ${className}`}>
    {children}
  </div>
);

export const CardTitle = ({ children, className = '' }) => (
  <h3 className={`text-lg font-semibold text-gray-900 ${className}`}>
    {children}
  </h3>
);

export const CardContent = ({ children, className = '' }) => (
  <div className={`text-gray-700 ${className}`}>
    {children}
  </div>
);

export const CardFooter = ({ children, className = '' }) => (
  <div className={`mt-4 pt-4 border-t border-gray-200 ${className}`}>
    {children}
  </div>
);

export default Card;