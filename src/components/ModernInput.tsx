'use client';

import { FC, forwardRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface ModernInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  required?: boolean;
}

const ModernInput = forwardRef<HTMLInputElement, ModernInputProps>(
  ({ className, label, error, icon, required, value, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const hasValue = value !== '' && value !== undefined;
    const isFloating = isFocused || hasValue;

    return (
      <div className="w-full">
        <div className="relative">
          {icon && (
            <div className={cn(
              "absolute left-4 transition-all duration-200 ease-out",
              isFloating ? "top-4 text-[#EA3C23]" : "top-1/2 -translate-y-1/2 text-gray-400"
            )}>
              {icon}
            </div>
          )}

          <input
            ref={ref}
            value={value}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={cn(
              "peer w-full px-4 pt-6 pb-2 rounded-2xl border-2 transition-all duration-200 bg-white dark:bg-gray-900/50 text-gray-900 dark:text-white placeholder-transparent focus:outline-none focus:border-[#EA3C23] hover:border-gray-400 dark:hover:border-gray-600",
              icon ? 'pl-12' : '',
              error
                ? 'border-red-500 focus:border-red-500'
                : 'border-gray-200 dark:border-gray-700',
              className
            )}
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '16px'
            }}
            {...props}
          />

          {label && (
            <label
              className={cn(
                "absolute left-4 transition-all duration-200 ease-out pointer-events-none",
                icon && 'left-12',
                isFloating
                  ? 'top-1.5 text-xs font-medium text-[#EA3C23]'
                  : 'top-1/2 -translate-y-1/2 text-base text-gray-500 dark:text-gray-400'
              )}
              style={{
                fontFamily: 'Montserrat, sans-serif'
              }}
            >
              {label}
              {required && <span className="text-[#EA3C23] ml-1">*</span>}
            </label>
          )}
        </div>

        {error && (
          <p
            className="mt-2 text-sm text-red-500 flex items-center gap-1"
            style={{
              fontFamily: 'Montserrat, sans-serif'
            }}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </p>
        )}
      </div>
    );
  }
);

ModernInput.displayName = 'ModernInput';

export default ModernInput;