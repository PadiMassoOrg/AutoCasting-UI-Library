import React from 'react';
import type { ButtonProps } from './Button.types';
import './Button.css';

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className = '', ...rest }) => {
  return (
    <button className={`button button--${variant} ${className}`} {...rest}>
      {children}
    </button>
  );
};
