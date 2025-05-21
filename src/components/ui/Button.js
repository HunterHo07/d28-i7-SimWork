'use client';

import { forwardRef } from 'react';
import { motion } from 'framer-motion';

const Button = forwardRef(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      className = '',
      disabled = false,
      isLoading = false,
      leftIcon = null,
      rightIcon = null,
      onClick,
      ...props
    },
    ref
  ) => {
    // Variant styles
    const variantStyles = {
      primary:
        'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20',
      secondary:
        'bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-600/20',
      success:
        'bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-600/20',
      danger:
        'bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/20',
      warning:
        'bg-yellow-500 hover:bg-yellow-600 text-white shadow-lg shadow-yellow-500/20',
      info: 'bg-cyan-500 hover:bg-cyan-600 text-white shadow-lg shadow-cyan-500/20',
      light:
        'bg-gray-200 hover:bg-gray-300 text-gray-800 shadow-lg shadow-gray-200/20',
      dark: 'bg-gray-800 hover:bg-gray-900 text-white shadow-lg shadow-gray-800/20',
      outline:
        'bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white',
      ghost:
        'bg-transparent hover:bg-blue-100 text-blue-600 shadow-none',
    };

    // Size styles
    const sizeStyles = {
      xs: 'px-2 py-1 text-xs',
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-5 py-2.5 text-lg',
      xl: 'px-6 py-3 text-xl',
    };

    // Disabled styles
    const disabledStyles = disabled
      ? 'opacity-50 cursor-not-allowed'
      : 'transform hover:-translate-y-0.5 active:translate-y-0';

    // Loading indicator
    const LoadingSpinner = () => (
      <svg
        className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    );

    return (
      <motion.button
        ref={ref}
        className={`inline-flex items-center justify-center rounded-md font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
          variantStyles[variant] || variantStyles.primary
        } ${sizeStyles[size] || sizeStyles.md} ${disabledStyles} ${className}`}
        whileTap={{ scale: disabled ? 1 : 0.98 }}
        disabled={disabled || isLoading}
        onClick={onClick}
        {...props}
      >
        {isLoading && <LoadingSpinner />}
        {!isLoading && leftIcon && (
          <span className="mr-2 inline-flex">{leftIcon}</span>
        )}
        {children}
        {!isLoading && rightIcon && (
          <span className="ml-2 inline-flex">{rightIcon}</span>
        )}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
