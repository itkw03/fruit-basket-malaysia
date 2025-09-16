import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  children: React.ReactNode;
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  children,
  isLoading = false,
  className = '',
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-primary-peach-coral text-white hover:shadow-lg focus:ring-primary-peach-coral/50 hover:scale-105',
    secondary: 'bg-neutral-charcoal text-white hover:bg-neutral-charcoal/90 focus:ring-neutral-charcoal/50 hover:scale-105',
    outline: 'border-2 border-primary-peach-coral text-primary-peach-coral hover:bg-primary-peach-coral hover:text-white focus:ring-primary-peach-coral/50 hover:scale-105',
    ghost: 'text-neutral-charcoal hover:bg-primary-light-peach hover:text-primary-peach-coral focus:ring-primary-peach-coral/50 hover:scale-105'
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  return (
    <motion.button
      className={classes}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      disabled={isLoading}
      {...props}
    >
      {isLoading && (
        <motion.div
          className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full mr-2"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      )}
      
      {Icon && iconPosition === 'left' && !isLoading && (
        <Icon className={`w-4 h-4 ${children ? 'mr-2' : ''}`} />
      )}
      
      {children}
      
      {Icon && iconPosition === 'right' && !isLoading && (
        <Icon className={`w-4 h-4 ${children ? 'ml-2' : ''}`} />
      )}
    </motion.button>
  );
};

export default Button;