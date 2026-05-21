import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
  error?: string;
}

export function Input({
  label,
  icon,
  error,
  className = '',
  ...props
}: InputProps) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label className="text-xs font-bold text-[#A0A0A0] uppercase tracking-wider">
          {label}
        </label>
      )}
      <div className="relative w-full">
        {icon && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A0A0A0] flex items-center justify-center pointer-events-none">
            {icon}
          </span>
        )}
        <input
          className={`w-full h-12 pr-4 bg-[#F5F5F7] border border-[#EAEAEA] rounded-2xl text-sm font-semibold text-[#111111] transition-all focus:outline-none focus:ring-2 focus:ring-[#6A4A3C]/20 focus:bg-white placeholder:text-[#A0A0A0] ${
            icon ? 'pl-12' : 'pl-4'
          } ${error ? 'border-red-500 focus:ring-red-500/20' : 'hover:border-[#6A4A3C]/30'} ${className}`}
          {...props}
        />
      </div>
      {error && <span className="text-xs font-bold text-red-500 mt-0.5">{error}</span>}
    </div>
  );
}
