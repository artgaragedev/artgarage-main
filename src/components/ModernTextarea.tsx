'use client';

import { FC, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface ModernTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  required?: boolean;
}

const ModernTextarea = forwardRef<HTMLTextAreaElement, ModernTextareaProps>(
  ({ className, label, error, icon, required, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label 
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            style={{
              fontFamily: 'Montserrat, sans-serif'
            }}
          >
            {label}
            {required && <span className="text-[#EA3C23] ml-1">*</span>}
          </label>
        )}
        
        <div className="relative">
          {icon && (
            <div className="absolute left-4 top-4 text-gray-400">
              {icon}
            </div>
          )}
          
          <textarea
            ref={ref}
            className={cn(
              `
                w-full px-4 py-3 rounded-xl border-2 transition-all duration-200
                bg-white dark:bg-gray-900 text-gray-900 dark:text-white
                placeholder-gray-400 dark:placeholder-gray-500
                focus:outline-none focus:ring-2 focus:ring-[#EA3C23]/20 resize-none
                ${icon ? 'pl-12' : ''}
                ${error 
                  ? 'border-red-500 focus:border-red-500' 
                  : 'border-gray-200 dark:border-gray-700 focus:border-[#EA3C23]'
                }
              `,
              className
            )}
            style={{
              fontFamily: 'Montserrat, sans-serif'
            }}
            {...props}
          />
          
          {/* Анимированный градиентный бордер при фокусе */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#EA3C23] via-[#FF6B4A] to-[#EA3C23] p-[2px] opacity-0 focus-within:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="w-full h-full rounded-xl bg-white dark:bg-gray-900" />
          </div>
        </div>
        
        {error && (
          <p 
            className="mt-1 text-sm text-red-500"
            style={{
              fontFamily: 'Montserrat, sans-serif'
            }}
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

ModernTextarea.displayName = 'ModernTextarea';

export default ModernTextarea;