import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  className = '',
  disabled = false,
  isLoading = false,
  onClick,
  type = 'button',
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00C878] focus-visible:ring-offset-2 focus-visible:ring-offset-[#141414] disabled:opacity-50 disabled:cursor-not-allowed select-none cursor-pointer active:scale-[0.98]";

  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs gap-1.5 font-medium",
    md: "px-4 py-2 text-sm gap-2 font-semibold",
    lg: "px-6 py-3 text-base gap-2.5 font-bold",
  };

  const variantStyles = {
    primary: "bg-[#00C878] text-[#141414] hover:bg-[#00E68A] shadow-md shadow-[#00C878]/15 hover:shadow-lg hover:shadow-[#00C878]/25 font-bold",
    secondary: "bg-[#8BEF4A] text-[#141414] hover:bg-[#9eff58] shadow-md shadow-[#8BEF4A]/15 hover:shadow-lg hover:shadow-[#8BEF4A]/25 font-bold",
    outline: "border border-[#343434] bg-[#1A1A1A]/40 text-[#F5F5F5] hover:bg-[#222222] hover:border-[#00C878]/50 hover:text-[#00C878]",
    ghost: "bg-transparent text-[#A3A3A3] hover:text-[#F5F5F5] hover:bg-[#222222]",
    glass: "glass-pill text-[#F5F5F5] hover:bg-[#292929] hover:border-[#00C878]/50 hover:text-[#00C878]",
  };

  const isButtonDisabled = disabled || isLoading;

  return (
    <motion.button
      whileHover={{ scale: isButtonDisabled ? 1 : 1.015 }}
      whileTap={{ scale: isButtonDisabled ? 1 : 0.98 }}
      type={type}
      onClick={onClick}
      disabled={isButtonDisabled}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin shrink-0" />
          <span>{typeof children === 'string' ? children : 'Loading...'}</span>
        </>
      ) : (
        <>
          {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0 transition-transform group-hover:-translate-x-0.5" />}
          <span>{children}</span>
          {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-0.5" />}
        </>
      )}
    </motion.button>
  );
};

export default Button;

