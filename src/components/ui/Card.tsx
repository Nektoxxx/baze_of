import type { HTMLAttributes } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = '', ...props }: CardProps) {
  const classes = ['ui-card', className].filter(Boolean).join(' ');
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}
