'use client';
import React, { FC, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  hint?: string;
  error?: boolean;
  success?: boolean;
}

const Input: FC<InputProps> = ({
  className = '',
  error = false,
  success = false,
  hint,
  disabled = false,
  ...props
}) => {
  let inputClasses = `h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 ${className}`;

  if (disabled) {
    inputClasses += ` bg-gray-100 opacity-50 text-gray-500 border-gray-300 cursor-not-allowed dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700`;
  } else if (error) {
    inputClasses += ` bg-transparent text-gray-400 border-gray-300 focus:border-error-300 focus:ring-error-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-error-800`;
  } else if (success) {
    inputClasses += ` bg-transparent text-gray-400 border-gray-300 focus:border-success-300 focus:ring-success-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-success-800`;
  } else {
    inputClasses += ` bg-transparent text-gray-400 border-gray-300 focus:border-brand-300 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800`;
  }

  return (
    <div className="relative">
      <input className={inputClasses} disabled={disabled} {...props} />
      {hint && (
        <p
          className={`mt-1.5 text-xs ${
            error
              ? 'text-error-500'
              : success
                ? 'text-success-500'
                : 'text-gray-500 dark:text-gray-400'
          }`}
        >
          {hint}
        </p>
      )}
    </div>
  );
};

export default Input;
