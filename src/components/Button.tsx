import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'accent';
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', ...props }) => {
  const variantClasses = {
    primary: 'btn-primary',
    accent: 'btn-accent',
  };

  return (
    <button className={`${variantClasses[variant]} px-4 py-2 rounded-md focus:outline-none`} {...props}>
      {children}
    </button>
  );
};

export default Button;
