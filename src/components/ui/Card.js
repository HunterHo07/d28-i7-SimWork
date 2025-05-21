'use client';

import { motion } from 'framer-motion';

export default function Card({
  children,
  className = '',
  variant = 'default',
  hover = true,
  onClick,
  ...props
}) {
  // Variant styles
  const variantStyles = {
    default: 'bg-gray-900 border border-gray-800',
    glass: 'glass',
    outline: 'bg-transparent border border-gray-700',
    elevated: 'bg-gray-900 border border-gray-800 shadow-xl',
    primary: 'bg-blue-900/20 border border-blue-800/50',
    success: 'bg-green-900/20 border border-green-800/50',
    warning: 'bg-yellow-900/20 border border-yellow-800/50',
    danger: 'bg-red-900/20 border border-red-800/50',
    info: 'bg-cyan-900/20 border border-cyan-800/50',
  };

  // Hover effect
  const hoverEffect = hover
    ? 'transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-1'
    : '';

  // Click effect
  const clickEffect = onClick ? 'cursor-pointer' : '';

  return (
    <motion.div
      className={`rounded-lg p-6 ${variantStyles[variant] || variantStyles.default} ${hoverEffect} ${clickEffect} ${className}`}
      whileHover={hover ? { y: -5 } : {}}
      whileTap={onClick ? { scale: 0.98 } : {}}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
