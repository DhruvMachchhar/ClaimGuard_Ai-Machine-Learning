import React from 'react';
import { motion } from 'framer-motion';

export const PageTransition = ({ children, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`min-h-[calc(100vh-160px)] ${className}`}
    >
      {children}
    </motion.div>
  );
};
