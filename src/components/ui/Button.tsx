import { forwardRef, type ButtonHTMLAttributes } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: React.ReactNode;
  className?: string;
}

const variantClass: Record<ButtonVariant, string> = {
  primary: 'ui-btn ui-btn--primary',
  secondary: 'ui-btn ui-btn--secondary',
  ghost: 'ui-btn ui-btn--ghost',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', children, className = '', type = 'button', ...props }, ref) => {
    const classes = [variantClass[variant], className].filter(Boolean).join(' ');
    return (
      <button ref={ref} type={type} className={classes} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
