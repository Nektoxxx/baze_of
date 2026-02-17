import type { HTMLAttributes } from 'react';

export type BadgeVariant = 'neutral' | 'primary';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const variantClass: Record<BadgeVariant, string> = {
  neutral: 'ui-badge',
  primary: 'ui-badge ui-badge--primary',
};

export function Badge({
  variant = 'neutral',
  children,
  className = '',
  ...props
}: BadgeProps) {
  const classes = [variantClass[variant], className].filter(Boolean).join(' ');
  return (
    <span className={classes} {...props}>
      {children}
    </span>
  );
}
