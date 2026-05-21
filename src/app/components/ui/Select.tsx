import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { label: string; value: string | number }[];
}

export function Select({
  label,
  options,
  className = '',
  ...props
}: SelectProps) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label className="text-xs font-bold text-[#A0A0A0] uppercase tracking-wider">
          {label}
        </label>
      )}
      <div className="relative w-full">
        <select
          className={`w-full px-4 py-3 bg-white border border-[#EAEAEA] rounded-xl text-sm font-semibold text-[#111111] transition-all focus:outline-none focus:ring-2 focus:ring-[#6A4A3C]/20 cursor-pointer appearance-none ${className}`}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center text-[#777777]">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
}
