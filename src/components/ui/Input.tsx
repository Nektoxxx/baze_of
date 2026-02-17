import { forwardRef, type InputHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  id?: string;
  className?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, id: idProp, className = '', error, ...props }, ref) => {
    const id = idProp ?? `input-${Math.random().toString(36).slice(2, 9)}`;
    const classes = ['ui-input', className].filter(Boolean).join(' ');
    return (
      <div className="ui-input-wrapper">
        {label && (
          <label htmlFor={id} className="ui-input-label">
            {label}
          </label>
        )}
        <input ref={ref} id={id} className={classes} aria-invalid={!!error} {...props} />
        {error && (
          <span className="ui-input-error" role="alert">
            {error}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
