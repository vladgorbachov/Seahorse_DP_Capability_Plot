import React from 'react';

const Slider = ({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  label,
  className = '',
  disabled = false
}) => {
  const handleChange = (e) => {
    onChange(parseFloat(e.target.value));
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
          disabled={disabled}
          className={`
            w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          `}
          style={{
            background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${(value - min) / (max - min) * 100}%, #E5E7EB ${(value - min) / (max - min) * 100}%, #E5E7EB 100%)`
          }}
        />
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
          <span className="text-sm text-gray-600">
            {value}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Slider;