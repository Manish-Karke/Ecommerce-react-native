// components/CustomButton.tsx
import { CustomButtonProps } from '@/types/type';
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';


const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  rounded = false,
  fullWidth = false,
  className = ''
}) => {
  let baseClasses = 'items-center justify-center my-2';
  if (fullWidth) baseClasses += ' w-full';
  if (rounded) baseClasses += ' rounded-full';
  else baseClasses += ' rounded-lg';


  const variantClasses = {
    primary: 'bg-green-500',
    secondary: 'bg-blue-500',
  };


  const sizeClasses = {
    small: 'py-2 px-4',
    medium: 'py-3 px-5',
    large: 'py-4 px-7',
  };


  const disabledClass = disabled ? 'bg-gray-400' : '';

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClass} ${className}`}
      activeOpacity={0.8}
    >
      <Text className="text-white font-semibold">{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
