import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'success' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  fullWidth = false,
  className = '',
  ...props
}: ButtonProps) {
  // Premium HSL-harmonious color palettes matching Oak & Chisel identity
  const baseStyles = 'inline-flex items-center justify-center font-bold transition-all duration-200 rounded-xl cursor-pointer select-none active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none';
  
  const variants = {
    primary: 'bg-[#6A4A3C] hover:bg-[#50372D] text-white shadow-sm',
    secondary: 'bg-[#111111] hover:bg-neutral-800 text-white shadow-sm',
    outline: 'bg-white border border-[#EAEAEA] hover:border-[#6A4A3C] hover:text-[#6A4A3C] text-[#555555]',
    danger: 'bg-red-50 hover:bg-red-100 text-red-600 border border-red-100',
    success: 'bg-green-50 hover:bg-green-100 text-green-700 border border-green-100',
    ghost: 'bg-transparent hover:bg-[#F5F5F7] text-[#777777] hover:text-[#111111]',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-5 py-2.5 text-sm gap-2',
    lg: 'px-7 py-3.5 text-base gap-2.5',
  };

  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthStyle} ${className}`}
      {...props}
    >
      {icon && iconPosition === 'left' && <span className="flex-shrink-0">{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span className="flex-shrink-0">{icon}</span>}
    </button>
  );
}
