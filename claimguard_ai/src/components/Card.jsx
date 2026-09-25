import React from 'react';
import { motion } from 'framer-motion';

export const Card = ({
  children,
  className = '',
  hoverEffect = true,
  glass = false,
  onClick,
  ...props
}) => {
  const baseClasses = glass
    ? 'glass-card rounded-2xl p-6 border border-[#343434]/80 shadow-lg'
    : 'bg-[#1E1E1E] rounded-2xl p-6 border border-[#343434] shadow-md';

  const hoverClasses = hoverEffect
    ? 'transition-all duration-300 hover:border-[#00C878]/40 hover:shadow-xl hover:shadow-[#00C878]/5'
    : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      onClick={onClick}
      className={`${baseClasses} ${hoverClasses} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;

