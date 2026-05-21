import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
  glassmorphism?: boolean;
}

export function Card({
  children,
  hoverable = false,
  glassmorphism = false,
  className = '',
  ...props
}: CardProps) {
  const baseStyle = 'bg-white border border-[#EAEAEA] rounded-3xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-all duration-300';
  const hoverStyle = hoverable ? 'hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] hover:border-[#6A4A3C]/20 hover:scale-[1.005]' : '';
  const glassStyle = glassmorphism ? 'bg-white/90 backdrop-blur-md' : '';

  return (
    <div
      className={`${baseStyle} ${hoverStyle} ${glassStyle} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`flex items-center justify-between mb-4 gap-4 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardBody({ children, className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`mt-4 border-t border-[#F5F5F7] pt-4 ${className}`} {...props}>
      {children}
    </div>
  );
}
