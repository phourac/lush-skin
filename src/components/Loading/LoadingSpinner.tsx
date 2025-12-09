import { motion } from 'framer-motion';
import React from 'react';

interface LoadingSpinnerProps {
  size?: number; // px
  color?: string; // Tailwind class or CSS color
  className?: string;
}

export default function LoadingSpinner({
  size = 24,
  color = 'border-primary-light',
  className = '',
}: LoadingSpinnerProps) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <motion.div
        className={`rounded-full border-2 border-t-transparent ${color}`}
        style={{
          width: size,
          height: size,
        }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </div>
  );
}
