import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  gradient?: boolean;
}

export function Card({ children, className = '', gradient = false }: CardProps) {
  return (
    <div className={`glass-card rounded-xl overflow-hidden transition-all duration-300 relative ${gradient ? 'bg-gradient-premium' : ''} ${className}`}>
      {children}
    </div>
  );
}
